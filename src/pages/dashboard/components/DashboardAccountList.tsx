// Components
import { Button } from 'components/ui'
import { LinkedAccount, LinkedAccountSkeleton } from '.'

// Hooks & Helpers
import { useGetAccountsQuery } from 'features/account/accountApi'

type Props = {
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const DashboardAccountList = ({
  handleCTA,
  handleAccountChange,
}: Props) => {
  const { data: accounts, isLoading: isAccountsLoading } = useGetAccountsQuery()

  return (
    <div className='space-y-4'>
      {isAccountsLoading ? (
        <LinkedAccountSkeleton />
      ) : (
        accounts?.map(
          ({ id, accountId, accountName, bankLogo, accountIban }) => (
            <LinkedAccount
              key={id}
              accountIban={accountIban}
              accountName={accountName}
              bankLogo={bankLogo}
              onClick={() => handleAccountChange(accountId)}
            />
          )
        )
      )}

      <Button variant='primary' onClick={handleCTA}>
        Connect a new Account
      </Button>
    </div>
  )
}
