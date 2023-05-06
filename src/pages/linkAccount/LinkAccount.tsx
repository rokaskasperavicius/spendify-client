import { useNavigate, useSearchParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

// Assets
import ArrowLeft from 'assets/arrow-left.svg'

// Components
import { Spinner, Image, Container } from 'components/ui'

// Hooks & Helpers
import { useTitle } from 'hooks/useTitle'
import {
  useGetInstitutionsQuery,
  useGetAccountConnectUrlMutation,
  useGetAvailableAccountsQuery,
  useConnectAccountMutation,
} from 'features/account/accountApi'
import { isFetchBaseQueryError } from 'services/isFetchBaseQueryError'

// Types
import { ERROR_CODES } from 'services/types'
import { useEffect } from 'react'

export const LinkAccount = () => {
  useTitle('Connect Account')

  const { data: institutions, isLoading } = useGetInstitutionsQuery()
  const [generateAccountLinkUrl] = useGetAccountConnectUrlMutation()
  const [linkAccount] = useConnectAccountMutation()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref')

  const { data: linkableAccounts, isLoading: isLinkableAccountsLoading } =
    useGetAvailableAccountsQuery(ref ?? skipToken)

  const createLink = async (institutionId: string) => {
    try {
      const { url } = await generateAccountLinkUrl({
        institutionId,
        redirect: process.env.REACT_APP_REDIRECT as string,
      }).unwrap()
      window.location.replace(url)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (window.opener) {
      window.opener.location.href = window.location.href

      window.close()
    }
  }, [])

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

  if (ref) {
    return (
      <main className='flex-1 relative'>
        <Spinner isLoading={isLinkableAccountsLoading}>
          <Container>
            <div className='flex justify-between md:items-center mt-4 flex-col md:flex-row'>
              <div
                className='cursor-pointer hover:underline flex items-center gap-1'
                onClick={() => navigate('/')}
              >
                <Image size='smm' alt='arrow left' src={ArrowLeft} />
                <div>Go Back</div>
              </div>
              <h3 className='text-lg text-center mt-2 md:mt-0'>
                Select Your Bank Account
              </h3>
              <div />
            </div>

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
      </main>
    )
  }

  return (
    <main className='flex-1 relative'>
      <Spinner isLoading={isLoading}>
        <Container>
          <div className='flex justify-between md:items-center mt-4 flex-col md:flex-row'>
            <div
              className='cursor-pointer hover:underline flex items-center gap-1'
              onClick={() => navigate('/')}
            >
              <Image size='smm' alt='arrow left' src={ArrowLeft} />
              <div>Go Back</div>
            </div>
            <h3 className='text-lg text-center mt-2 md:mt-0'>
              Choose Your Danish Bank
            </h3>
            <div />
          </div>

          <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mt-4'>
            {institutions?.map((institution) => (
              <div
                key={institution.id}
                className='flex items-center gap-4 border border-gray-400 p-2 rounded-md cursor-pointer hover:bg-gray-100'
                onClick={() => createLink(institution.id)}
              >
                <img
                  className='object-cover w-[70px] h-[70px] rounded-md'
                  src={institution.bankLogo}
                  alt='Institution logo'
                />
                <h3 className='font-medium'>{institution.bankName}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Spinner>
    </main>
  )
}
