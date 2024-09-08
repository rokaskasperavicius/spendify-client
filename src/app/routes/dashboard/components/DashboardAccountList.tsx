import { Button } from '@/components/ui'

import { useGetAccountsQuery } from '@/features/accounts/accounts-api'

import { LinkedAccount, LinkedAccountSkeleton } from '.'

type Props = {
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const DashboardAccountList = ({
  handleCTA,
  handleAccountChange,
}: Props) => {
  const { data, isLoading: isAccountsLoading } = useGetAccountsQuery(undefined)

  return (
    <div className='space-y-4'>
      {isAccountsLoading ? (
        <LinkedAccountSkeleton />
      ) : (
        data?.accounts.map(({ id, name, institutionLogo, iban }) => (
          <LinkedAccount
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
