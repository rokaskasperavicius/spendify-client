import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Container, Image, Loader } from '@/components/ui'

import {
  useConnectAccountMutation,
  useGetAvailableAccountsQuery,
} from '@/features/accounts/accounts.api'

import { ERROR_CODES } from '@/lib/types'
import { isFetchBaseQueryError } from '@/lib/utils/is-fetch-base-query-error'

import { ConnectAccountHeader } from './connect-account-header'

type Props = {
  reference: string
}

export const SelectAccount = ({ reference }: Props) => {
  const navigate = useNavigate()
  const [isConnecting, setIsConnecting] = useState(false)

  const [connectAccount] = useConnectAccountMutation()

  const { data: availableAccounts, isLoading: isAvailableAccountsLoading } =
    useGetAvailableAccountsQuery({ requisitionId: reference })

  const linkAccountHandler = async (
    accountId: string,
    requisitionId: string,
  ) => {
    if (isConnecting) return

    try {
      setIsConnecting(true)
      await connectAccount({ accountId, requisitionId }).unwrap()

      navigate('/')
    } catch (error) {
      if (
        isFetchBaseQueryError(error) &&
        error.code === ERROR_CODES.DUPLICATE_ACCOUNTS
      ) {
        toast.error('This account is already connected')
      } else {
        toast.error('Something went wrong. Please try again')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Loader
      isLoading={isAvailableAccountsLoading || isConnecting}
      text={isConnecting ? 'Syncing Your Account. Please wait...' : ''}
      rootClassName='pt-10'
    >
      <Container>
        <ConnectAccountHeader title='Select Your Bank Account' />

        <div className='space-y-4 mt-4'>
          {availableAccounts?.map((account) => (
            <div
              key={account.accountId}
              className='w-full md:w-1/2 border border-gray-400 p-2 rounded-md cursor-pointer hover:bg-gray-100 flex gap-4'
              onClick={() => linkAccountHandler(account.accountId, reference)}
            >
              {account.institutionLogo && (
                <div>
                  <Image
                    size='xl'
                    src={account.institutionLogo}
                    alt='Bank Logo'
                  />
                </div>
              )}

              <div className='space-y-2 overflow-hidden'>
                <div>
                  <h4 className='truncate'>{account.accountName}</h4>

                  <div className='text-sm text-gray-500 truncate'>
                    {account.accountIban}
                  </div>
                </div>

                <div>{account.accountBalance} DKK</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Loader>
  )
}
