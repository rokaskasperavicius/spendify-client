import { useState } from 'react'
import { useDebounce } from 'react-use'

import { REDIRECT_URL } from '@/config/constants'

import { Container, Image, Input, Loader } from '@/components/ui'

import {
  useGetInstitutionsQuery,
  useInitiateConnectAccountMutation,
} from '@/features/accounts/accounts.api'

import { ConnectAccountHeader } from './connect-account-header'

export const SelectInstitution = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useDebounce(() => setDebouncedSearch(search), 500, [search])

  const { data: institutions, isLoading: isInstitutionsLoading } =
    useGetInstitutionsQuery({ query: debouncedSearch })
  const [initiateConnectAccount] = useInitiateConnectAccountMutation()

  const createLink = async (institutionId: string) => {
    try {
      const { url } = await initiateConnectAccount({
        institutionId,
        redirect: REDIRECT_URL,
      }).unwrap()

      window.location.replace(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Loader isLoading={isInstitutionsLoading} rootClassName='pt-10'>
      <Container className='space-y-4 mb-4'>
        <ConnectAccountHeader title='Choose Your Danish Bank' />

        <div className='w-1/2 pr-3'>
          <Input
            className='w-full'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for Institution'
          />
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4'>
          {institutions?.map((institution) => (
            <div
              key={institution.id}
              className='flex items-center gap-4 border border-gray-400 p-2 rounded-md cursor-pointer hover:bg-gray-100'
              onClick={() => createLink(institution.id)}
            >
              <Image
                className='w-[70px] h-[70px]'
                src={institution.logo}
                alt='Institution logo'
              />
              <h3 className='font-medium'>{institution.name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </Loader>
  )
}
