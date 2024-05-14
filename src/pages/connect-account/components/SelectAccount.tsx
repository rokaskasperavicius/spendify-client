import { skipToken } from '@reduxjs/toolkit/query/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Container, Image, Spinner } from '@/components/ui'

import {
  useConnectAccountMutation,
  useGetAvailableAccountsQuery,
} from '@/features/account/accountApi'

import { isFetchBaseQueryError } from '@/services/isFetchBaseQueryError'
import { ERROR_CODES } from '@/services/types'

import { ConnectAccountHeader } from './ConnectAccountHeader'

type Props = {
  reference: string
}

export const SelectAccount = ({ reference }: Props) => {
  const navigate = useNavigate()

  const [linkAccount] = useConnectAccountMutation()

  const { data: linkableAccounts, isLoading: isLinkableAccountsLoading } =
    useGetAvailableAccountsQuery(reference ?? skipToken)

  const linkAccountHandler = async (accountId: string) => {
    try {
      await linkAccount({ accountId }).unwrap()

      navigate('/')
    } catch (error) {
      if (
        isFetchBaseQueryError(error) &&
        error.code === ERROR_CODES.DUPLICATE_ACCOUNTS
      ) {
        toast.error('This account is already connected')
      }
    }
  }

  return (
    <Spinner
      isLoading={isLinkableAccountsLoading}
      rootClassName='flex justify-center pt-10'
    >
      <Container>
        <ConnectAccountHeader title='Select Your Bank Account' />

        <div className='space-y-4 mt-4'>
          {linkableAccounts?.map((account) => (
            <div
              key={account.accountId}
              className='w-full md:w-72 border border-gray-400 p-2 rounded-md cursor-pointer hover:bg-gray-100 flex gap-4'
              onClick={() => linkAccountHandler(account.accountId)}
            >
              <div>
                <Image size='md' src={account.bankLogo} alt='Bank Logo' />
              </div>
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
    </Spinner>
  )
}
