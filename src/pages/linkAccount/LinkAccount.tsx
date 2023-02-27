import { useNavigate, useSearchParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'

// Components
import { Spinner } from 'components'

// Hooks & Helpers
import {
  useGetInstitutionsQuery,
  useGenerateAccountLinkUrlMutation,
  useGetLinkableAccountsQuery,
  useLinkAccountMutation,
} from 'features/linkedAccounts/linkedAccountsApi'

export const LinkAccount = () => {
  const { data: institutions, isLoading } = useGetInstitutionsQuery()
  const [generateAccountLinkUrl] = useGenerateAccountLinkUrlMutation()
  const [linkAccount] = useLinkAccountMutation()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref')

  const { data: linkableAccounts, isLoading: isLinkableAccountsLoading } =
    useGetLinkableAccountsQuery(ref ?? skipToken)

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
                <div>{account.accountBalance} kr</div>
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
          <h2 className='font-medium text-2xl'>Select a Danish Insitution</h2>
          <div />
        </div>

        <div className='grid grid-cols-3 gap-8 mt-4'>
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
