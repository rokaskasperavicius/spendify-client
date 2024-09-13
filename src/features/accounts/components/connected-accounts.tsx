import { Button } from '@/components/ui'

import { AccountsResponse } from '../accounts.types'
import { ConnectedAccount } from './connected-account'
import { ConnectedAccountsSkeleton } from './connected-accounts-skeleton'

type Props = {
  accounts: AccountsResponse['data']['accounts'] | undefined
  isLoading: boolean
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const ConnectedAccounts = ({
  accounts,
  isLoading,
  handleCTA,
  handleAccountChange,
}: Props) => {
  return (
    <div className='space-y-4'>
      {isLoading || !accounts ? (
        <ConnectedAccountsSkeleton />
      ) : (
        accounts.map(({ id, name, institutionLogo, iban }) => (
          <ConnectedAccount
            key={id}
            accountIban={iban}
            accountName={name}
            bankLogo={institutionLogo}
            onClick={() => handleAccountChange(id)}
          />
        ))
      )}

      <Button variant='primary' onClick={handleCTA}>
        Connect a new Account
      </Button>
    </div>
  )
}
