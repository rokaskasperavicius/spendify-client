import { useSearchParams } from 'react-router-dom'
import { match, P } from 'ts-pattern'

// Components
import { SelectAccount, SelectInstitution } from './components'

// Hooks & Helpers
import { useTitle } from 'hooks/useTitle'

export const ConnectAccount = () => {
  useTitle('Connect Account')

  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref')

  return match(ref)
    .with(P.string, () => <SelectAccount reference={ref as string} />)
    .otherwise(() => <SelectInstitution />)
}
