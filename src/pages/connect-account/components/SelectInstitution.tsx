import { useState } from 'react'
import { useDebounce } from 'react-use'

import { Container, Input, Spinner } from '@/components/ui'

import {
  useGetAccountConnectUrlMutation,
  useGetInstitutionsQuery,
} from '@/features/account/accountApi'

import { NORDIGEN_REDIRECT_URL } from '@/lib/constants'

import { ConnectAccountHeader } from './ConnectAccountHeader'

export const SelectInstitution = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useDebounce(() => setDebouncedSearch(search), 500, [search])

  const { data: institutions, isLoading: isInstitutionsLoading } =
    useGetInstitutionsQuery(debouncedSearch)
  const [generateAccountLinkUrl] = useGetAccountConnectUrlMutation()

  const createLink = async (institutionId: string) => {
    try {
      const { url } = await generateAccountLinkUrl({
        institutionId,
        redirect: NORDIGEN_REDIRECT_URL,
      }).unwrap()

      window.location.replace(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Spinner
      isLoading={isInstitutionsLoading}
      rootClassName='flex justify-center pt-10'
    >
      <Container className='space-y-4'>
        <ConnectAccountHeader title='Choose Your Danish Bank' />

        <div className='flex gap-4 items-center'>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for Institution'
          />

          <div>Found: {institutions?.length || 0}</div>
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
                src={institution.logo}
                alt='Institution logo'
              />
              <h3 className='font-medium'>{institution.name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </Spinner>
  )
}
