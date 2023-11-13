import { useNavigate } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import qs from 'qs'

import { useDebounce } from 'react-use'

// Components
import { Spinner } from 'components/ui'
import {
  DashboardTooltip,
  DashboardAccountList,
  DashboardSelectedAccount,
  DashboardBarChart,
  TransactionGraph,
} from './components'

import {
  useGetAccountsQuery,
  useGetAccountTransactionsQuery,
  useGetAccountTransactionsGroupedQuery,
} from 'features/account/accountApi'
import { useEffect, useMemo, useState } from 'react'
import { Button } from 'components/ui'
import { DashboardTransactionList } from './components/DashboardTransactionList'

import { filterIntervals } from 'features/account/utils'

import { useTitle } from 'hooks/useTitle'

// Types
import { GetLinkedAccount } from 'features/account/types'
import { useAccountSlice } from 'features/account/accountSlice'

export const Dashboard = () => {
  useTitle('Dashboard')

  const [view2, setView2] = useState<'separate' | 'grouped'>('separate')

  const { data: linkedAccounts, isLoading: isAccountsLoading } =
    useGetAccountsQuery()
  const { intervals, timestamp } = useAccountSlice()

  const filteredIntervals = useMemo(
    () => filterIntervals(intervals),
    [intervals]
  )

  const [selectedAccount, setSelectedAccount] = useState<GetLinkedAccount>()
  const accountId = selectedAccount?.accountId
  const {
    data: groupedTransactions,
    isFetching: isGroupedTransactionsFetching,
  } = useGetAccountTransactionsGroupedQuery(accountId ?? skipToken)
  const [view, setView] = useState<'list' | 'line' | 'monthly'>('list')

  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const generateQuery = () => {
    const query = []

    if (search) {
      query.push(`search=${search}`)
    }

    if (category) {
      query.push(`category=${encodeURIComponent(category)}`)
    }

    query.push(qs.stringify({ intervals: filteredIntervals }))

    return query.join('&')
  }

  const [query, setQuery] = useState<string>()

  useDebounce(
    () => {
      setQuery(generateQuery())
    },
    400,
    [search, category, filteredIntervals, selectedAccount]
  )

  const handleAccountChange = (accountId: string) => {
    const account = linkedAccounts?.find(
      (account) => account.accountId === accountId
    )

    setSelectedAccount(account)
  }

  const { data: transactions, isFetching: isTransactionsFetching } =
    useGetAccountTransactionsQuery(
      {
        accountId: accountId as string,
        query: query as string,
      },
      { skip: !accountId || !query }
    )

  useEffect(() => {
    const account = linkedAccounts ? linkedAccounts[0] : undefined
    setSelectedAccount(account)
  }, [linkedAccounts])

  // No accounts found
  if (!isAccountsLoading && linkedAccounts?.length === 0) {
    return (
      <main className='flex-1 flex justify-center items-center'>
        <div>
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
      </main>
    )
  }

  return (
    <div className='flex flex-1'>
      <aside className='w-[300px] border-r border-gray-300 p-4 hidden lg:block z-20'>
        <DashboardAccountList
          handleCTA={() => navigate('/link-account')}
          handleAccountChange={handleAccountChange}
        />
      </aside>

      <div className='flex-1 overflow-hidden flex flex-col'>
        <Spinner
          isLoading={isAccountsLoading}
          rootClassName='h-full flex justify-center items-center'
        >
          <div className='p-4 border-b border-gray-300 italic text-sm'>
            Last updated: {new Date(timestamp).toLocaleString()}
          </div>

          <div className='p-4 border-b border-gray-300'>
            {selectedAccount && (
              <DashboardSelectedAccount
                selectedAccount={selectedAccount}
                handleCTA={() => navigate('/link-account')}
                handleAccountChange={handleAccountChange}
              />
            )}
          </div>

          <div className='flex border-b border-gray-300'>
            <div
              onClick={() => {
                setView2('separate')
                setView('list')
              }}
              className={clsx(
                'flex-1 py-2 px-4 cursor-pointer hover:bg-gray-50',
                {
                  'bg-gray-50': view2 === 'separate',
                }
              )}
            >
              Transactions
            </div>
            <div
              onClick={() => setView2('grouped')}
              className={clsx(
                'flex-1 py-2 px-4 border-l border-gray-300 hover:bg-gray-50 cursor-pointer',
                {
                  'bg-gray-50': view2 === 'grouped',
                }
              )}
            >
              Monthly Overview
            </div>
          </div>

          <div className='relative h-full'>
            <AnimatePresence initial={false}>
              {view2 === 'separate' && (
                <motion.div
                  className='absolute inset-0 flex flex-col'
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className='p-4 border-b border-gray-300'>
                    <div>
                      <DashboardTooltip
                        isShown={isTooltipActive}
                        showIntervals={view === 'line'}
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                      />

                      <div className='flex justify-between items-center'>
                        <div
                          className='cursor-pointer hover:underline'
                          onClick={() =>
                            setIsTooltipActive((isActive) => !isActive)
                          }
                        >
                          {isTooltipActive ? 'Hide' : 'Filter'}
                        </div>

                        <div className='flex gap-2'>
                          <div>View: </div>
                          <div
                            className={clsx(
                              'cursor-pointer hover:underline select-none',
                              { underline: view === 'list' }
                            )}
                            onClick={() => setView('list')}
                          >
                            List
                          </div>

                          <div
                            className={clsx(
                              'cursor-pointer hover:underline select-none',
                              { underline: view === 'line' }
                            )}
                            onClick={() => setView('line')}
                          >
                            Line
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex-1 overflow-y-scroll'>
                    {transactions &&
                    transactions[0].transactions.length === 0 ? (
                      <div className='h-full flex justify-center items-center'>
                        No Transactions
                      </div>
                    ) : (
                      <div className='h-full'>
                        {view === 'line' ? (
                          <TransactionGraph
                            isLoading={isTransactionsFetching}
                            transactions={transactions}
                          />
                        ) : (
                          <DashboardTransactionList
                            isLoading={isTransactionsFetching}
                            transactions={
                              transactions
                                ? transactions[0].transactions
                                : undefined
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {view2 === 'grouped' && (
                <motion.div
                  className='absolute left-0 top-0 h-full w-full'
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                >
                  <DashboardBarChart
                    isLoading={isGroupedTransactionsFetching}
                    groupedAccountTransactions={groupedTransactions}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Spinner>
      </div>
    </div>
  )
}
