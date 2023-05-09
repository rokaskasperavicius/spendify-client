// Components
import { Spinner, Container } from 'components/ui'
import { ConnectAccountHeader } from './ConnectAccountHeader'

// Constants
import { NORDIGEN_REDIRECT_URL } from 'lib/constants'

// Hooks & Helpers
import {
  useGetInstitutionsQuery,
  useGetAccountConnectUrlMutation,
} from 'features/account/accountApi'

export const SelectInstitution = () => {
  const { data: institutions, isLoading: isInstitutionsLoading } =
    useGetInstitutionsQuery()
  const [generateAccountLinkUrl] = useGetAccountConnectUrlMutation()

  const createLink = async (institutionId: string) => {
    try {
      const { url } = await generateAccountLinkUrl({
        institutionId,
        redirect: NORDIGEN_REDIRECT_URL,
      }).unwrap()

      window.location.replace(url)
    } catch {}
  }

  return (
    <Spinner
      isLoading={isInstitutionsLoading}
      rootClassName='flex justify-center pt-10'
    >
      <Container>
        <ConnectAccountHeader title='Choose Your Danish Bank' />

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
  )
}
