import { useNavigate, useSearchParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'

// Components
import { Spinner } from 'components/ui'

// Hooks & Helpers
import { useTitle } from 'hooks/useTitle'
import {
  useGetInstitutionsQuery,
  useGetAccountConnectUrlMutation,
  useGetAvailableAccountsQuery,
  useConnectAccountMutation,
} from 'features/account/accountApi'

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

      window.open(url, '_self')
    } catch (err) {
      console.error(err)
    }
  }

  const linkAccountHandler = async (
    requisitionId: string,
    accountId: string
  ) => {
    try {
      await linkAccount({ requisitionId, accountId })

      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (ref) {
    return (
      <Spinner isLoading={isLinkableAccountsLoading}>
        <div className='p-4'>
          <div className='flex justify-between items-center'>
            <div
              className='cursor-pointer hover:underline'
              onClick={() => navigate('/')}
            >
              Go Back
            </div>
            <h2 className='font-medium text-2xl'>Select Your Bank Account</h2>
            <div />
          </div>

          <div className='flex gap-4'>
            {linkableAccounts?.map((account) => (
              <div
                key={account.accountId}
                className='border border-gray-400 p-2 rounded-md cursor-pointer hover:bg-gray-100'
                onClick={() =>
                  linkAccountHandler(account.requisitionId, account.accountId)
                }
              >
                <h3 className='flex gap-2 items-center'>
                  {account.accountName}
                  <div className='text-sm text-gray-500'>
                    {account.accountIban}
                  </div>
                </h3>
                <div>{account.accountBalance} DKK</div>
              </div>
            ))}
          </div>
        </div>
      </Spinner>
    )
  }

  return (
    <Spinner isLoading={isLoading}>
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <div
            className='cursor-pointer hover:underline'
            onClick={() => navigate('/')}
          >
            Go Back
          </div>
          <h2 className='font-medium text-2xl'>Select a Danish Institution</h2>
          <div />
        </div>

        <div className='grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 mt-4'>
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
      </div>
    </Spinner>
  )
}
