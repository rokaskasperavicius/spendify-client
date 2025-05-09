import { useSearchParams } from 'react-router-dom'
import { P, match } from 'ts-pattern'

import { useTitle } from '@/hooks/use-title'

import { SelectAccount } from './components/select-account'
import { SelectInstitution } from './components/select-institution'

export const ConnectAccount = () => {
  useTitle('Connect Account')

  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref')
  const secret = searchParams.get('secret')

  return match(ref)
    .with(P.string, () => (
      <SelectAccount reference={ref as string} secret={secret as string} />
    ))
    .otherwise(() => <SelectInstitution />)
}
