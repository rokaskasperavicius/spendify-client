import { Button } from '@/components/ui'

import { useGetAccountsQuery } from '@/features/account/accountApi'

import { LinkedAccount, LinkedAccountSkeleton } from '.'

type Props = {
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const DashboardAccountList = ({
  handleCTA,
  handleAccountChange,
}: Props) => {
  const { data, isLoading: isAccountsLoading } = useGetAccountsQuery()

  return (
    <div className='space-y-4'>
      {isAccountsLoading ? (
        <LinkedAccountSkeleton />
      ) : (
        data?.accounts.map(
          ({ id, accountId, accountName, bankLogo, accountIban }) => (
            <LinkedAccount
              key={id}
              accountIban={accountIban}
              accountName={accountName}
              bankLogo={bankLogo}
              onClick={() => handleAccountChange(accountId)}
            />
          ),
        )
      )}

      <Button variant='primary' onClick={handleCTA}>
        Connect a new Account
      </Button>
    </div>
  )
}
