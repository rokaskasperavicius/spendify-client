import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '@/components/ui'
import { Button } from '@/components/ui'

import { useGetAccountsQuery } from '@/features/accounts/accounts.api'
import { Account } from '@/features/accounts/accounts.types'
import { ConnectedAccountBanner } from '@/features/accounts/components/connected-account-banner'
import { ConnectedAccounts } from '@/features/accounts/components/connected-accounts'

import { useTitle } from '@/hooks/use-title'

import { TransactionsMonthlyOverview } from './components/transactions-monthly-overview'
import { TransactionsView } from './components/transactions-view'
import { ViewSwitch } from './components/view-switch'

export const Dashboard = () => {
  useTitle('Dashboard')

  const navigate = useNavigate()
  const [view, setView] = useState<'transactions' | 'expenses'>('transactions')
  const [selectedAccount, setSelectedAccount] = useState<Account>()

  const { data: accountsData, isLoading: isAccountsLoading } =
    useGetAccountsQuery(undefined)

  const { accounts } = accountsData || {}
  const accountId = selectedAccount?.id

  const handleAccountChange = (accountId: string) => {
    const account = accounts?.find((account) => account.id === accountId)

    setSelectedAccount(account)
  }

  useEffect(() => {
    const account = accounts ? accounts[0] : undefined
    setSelectedAccount(account)
  }, [accounts])

  // No accounts found
  if (!isAccountsLoading && accounts?.length === 0) {
    return (
      <div className='flex-1 flex justify-center items-center flex-col'>
        <div className='text-center'>No Accounts Found</div>
        <Button
          className='mt-4'
          fullWidth={false}
          variant='primary'
          onClick={() => navigate('/link-account')}
        >
          Connect a new Account
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-1'>
      <aside className='w-[300px] border-r border-gray-300 p-4 hidden lg:block z-20'>
        <ConnectedAccounts
          accounts={accountsData?.accounts}
          isLoading={isAccountsLoading}
          handleCTA={() => navigate('/link-account')}
          handleAccountChange={handleAccountChange}
        />
      </aside>

      <div className='flex-1 flex flex-col'>
        <Loader isLoading={isAccountsLoading} rootClassName='h-full'>
          <div>
            {selectedAccount && (
              <div className='p-4 border-b border-gray-300 italic text-sm'>
                Last updated:{' '}
                {new Date(selectedAccount.lastSyncedAt).toLocaleString()}
              </div>
            )}

            <div className='p-4 border-b border-gray-300'>
              <ConnectedAccountBanner
                isLoading={isAccountsLoading}
                account={selectedAccount}
                accounts={accounts}
                handleCTA={() => navigate('/link-account')}
                handleAccountChange={handleAccountChange}
              />
            </div>

            <div className='flex border-b border-gray-300'>
              <ViewSwitch view={view} setView={setView} />
            </div>
          </div>

          {accountId && (
            <div className='relative h-full'>
              <AnimatePresence initial={false}>
                {view === 'transactions' && (
                  <TransactionsView accountId={accountId} />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {view === 'expenses' && (
                  <TransactionsMonthlyOverview accountId={accountId} />
                )}
              </AnimatePresence>
            </div>
          )}
        </Loader>
      </div>
    </div>
  )
}
