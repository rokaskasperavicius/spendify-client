import { useNavigate } from 'react-router-dom'
import { subMonths, format } from 'date-fns'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import { useDebounce } from 'react-use'

// Assets
import ChartIcon from 'assets/chart.svg'
import ListIcon from 'assets/list.svg'

// Components
import { Input, Select, Dialog } from 'components/ui'
import {
  LinkedAccount,
  LinkedAccountSkeleton,
} from 'features/account/components'

import {
  useGetLinkedAccountsQuery,
  useGetLinkedTransactionsQuery,
} from 'features/account/linkedAccountApi'
import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui'
import { DashboardTransactionGraph } from './DashboardTransactionGraph'
import { DashboardTransactionList } from './DashboardTransactionList'

// Types
import { GetLinkedAccount } from 'features/account/types'

export const Dashboard = () => {
  const { data: linkedAccounts, isLoading } = useGetLinkedAccountsQuery()

  const [selectedAccount, setSelectedAccount] = useState<GetLinkedAccount>()

  const [view, setView] = useState<'list' | 'chart'>('list')
  const navigate = useNavigate()

  const [value, onChange] = useState([subMonths(new Date(), 1), new Date()])

  const accountId = selectedAccount?.accountId

  const [search, setSearch] = useState<string>()
  const [option, setOption] = useState<string>()

  const generateQuery = () => {
    const query = []

    if (search) {
      query.push(`search=${search}`)
    }

    if (option) {
      query.push(`category=${encodeURIComponent(option)}`)
    }

    if (value) {
      const from = new Date(format(value[0], 'yyyy-MM-dd')).toISOString()
      const to = new Date(format(value[1], 'yyyy-MM-dd')).toISOString()

      query.push(`from=${from}&to=${to}`)
    }

    return query.join('&')
  }

  const [query, setQuery] = useState<string>('')

  useDebounce(
    () => {
      setQuery(generateQuery())
    },
    400,
    [search, option, value]
  )

  const handleAccountChange = (accountId: string) => {
    const account = linkedAccounts?.find(
      (account) => account.accountId === accountId
    )

    setSelectedAccount(account)
  }

  const {
    data: transactions,
    isFetching: isTransactionsFetching,
    isLoading: isTransactionsLoading,
  } = useGetLinkedTransactionsQuery(
    {
      accountId: accountId as string,
      query: query,
    },
    { skip: !accountId }
  )

  useEffect(() => {
    const account = linkedAccounts ? linkedAccounts[0] : undefined

    setSelectedAccount(account)
  }, [linkedAccounts])

  const noTransactions =
    !isTransactionsLoading &&
    !isTransactionsFetching &&
    transactions?.length === 0

  return (
    <div className='flex min-h-[calc(100vh-57px-60px)]'>
      <aside className='w-[300px] border-r border-gray-300 p-4 space-y-4'>
        {!isLoading && !linkedAccounts && <div>Linked Accounts</div>}

        {isLoading ? (
          <LinkedAccountSkeleton />
        ) : (
          linkedAccounts?.map(
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

        <Button variant='primary' onClick={() => navigate('/link-account')}>
          Link a new Account
        </Button>
      </aside>

      <div className='flex-1 flex flex-col h-[calc(100vh-60px-57px)]'>
        {selectedAccount ? (
          <>
            <div className='p-4 border-b border-gray-300'>
              {selectedAccount && (
                <>
                  <div className='flex text-lg items-center justify-between font-medium'>
                    <div>{selectedAccount.accountName}</div>
                    <div>{selectedAccount.accountBalance} DKK</div>
                  </div>
                  <div className='text-gray-500 mt-1'>
                    {selectedAccount.accountIban}
                  </div>
                </>
              )}
            </div>
            <div className='p-4 border-b border-gray-300'>
              <div className='flex items-center justify-between'>
                <div className='flex items-stretch gap-4'>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search for transactions...'
                    className='w-60'
                  />

                  <Select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  />

                  <DateRangePicker
                    onChange={(e) => onChange(e as unknown as [])}
                    format='y-MM-dd'
                    value={value}
                    dayPlaceholder='dd'
                    monthPlaceholder='mm'
                    yearPlaceholder='yyyy'
                    // maxDate={new Date()}
                  />

                  <Dialog />
                </div>
                <div>
                  <div
                    className='flex items-center gap-2 cursor-pointer hover:underline select-none'
                    onClick={() => setView(view === 'chart' ? 'list' : 'chart')}
                  >
                    {view === 'chart' ? (
                      <span>Show list</span>
                    ) : (
                      <span>Show chart</span>
                    )}
                    <img
                      width={30}
                      height={30}
                      src={view === 'chart' ? ListIcon : ChartIcon}
                      alt='stuff'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex-1 relative overflow-y-scroll'>
              {noTransactions ? (
                <div className='h-full flex justify-center items-center'>
                  No Transactions
                </div>
              ) : (
                <div className='h-full'>
                  {view === 'chart' ? (
                    <DashboardTransactionGraph
                      isLoading={isTransactionsFetching}
                      transactions={transactions
                        ?.slice()
                        .sort((result, next) => next.weight - result.weight)}
                    />
                  ) : (
                    <DashboardTransactionList
                      isLoading={isTransactionsFetching}
                      transactions={transactions}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='h-full flex justify-center items-center'>
            No Selected Account
          </div>
        )}
      </div>
    </div>
  )
}
