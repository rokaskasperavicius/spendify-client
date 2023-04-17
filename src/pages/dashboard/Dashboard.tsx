import { useNavigate } from 'react-router-dom'
import { subMonths, format } from 'date-fns'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { useWindowSize } from 'react-use'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import qs from 'qs'

import { useDebounce } from 'react-use'

// Assets
import ChartIcon from 'assets/chart.svg'
import ListIcon from 'assets/list.svg'

// Components
import { Input, Select, Dialog } from 'components/ui'
import { AccountTransactionGraph } from 'features/account/components/TransactionGraph'
import {
  LinkedAccount,
  LinkedAccountSkeleton,
} from 'features/account/components'
import {
  DashboardIntervalDialog,
  DashboardAccountList,
  DashboardSelectedAccount,
  DashboardBarChart,
} from 'components/pages/Dashboard'

import {
  useGetAccountsQuery,
  useGetAccountTransactionsQuery,
  useGetAccountTransactionsGroupedQuery,
} from 'features/account/accountApi'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'components/ui'
import { DashboardTransactionList } from './DashboardTransactionList'

import { filterIntervals } from 'features/account/utils'

import { useTitle } from 'hooks/useTitle'

// Types
import {
  GetAccountTransactions,
  GetLinkedAccount,
} from 'features/account/types'
import { useAccountSlice } from 'features/account/accountSlice'

import { Breakpoints } from 'lib/constants'

export const Dashboard = () => {
  useTitle('Dashboard')

  const [view2, setView2] = useState<'separate' | 'grouped'>('separate')

  const { data: linkedAccounts, isLoading } = useGetAccountsQuery()
  const { intervals } = useAccountSlice()

  const screenWidth = useWindowSize().width

  const filteredIntervals = useMemo(
    () => filterIntervals(intervals),
    [intervals]
  )

  const [selectedAccount, setSelectedAccount] = useState<GetLinkedAccount>()
  const accountId = selectedAccount?.accountId
  const {
    data: groupedTransactions,
    isLoading: isGroupedAccountTransactionsLoading,
  } = useGetAccountTransactionsGroupedQuery(accountId ?? skipToken)

  const [view, setView] = useState<'list' | 'line' | 'monthly'>('list')

  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const navigate = useNavigate()

  // const [value, onChange] = useState([subMonths(new Date(), 1), new Date()])

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

  console.log(query)

  const handleAccountChange = (accountId: string) => {
    const account = linkedAccounts?.find(
      (account) => account.accountId === accountId
    )

    setSelectedAccount(account)
  }

  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetAccountTransactionsQuery(
      {
        accountId: accountId as string,
        query: query as string,
      },
      { skip: !accountId || !query }
    )

  useEffect(() => {
    const account = linkedAccounts ? linkedAccounts[0] : undefined
    // console.log(account)
    setSelectedAccount(account)
  }, [linkedAccounts])

  // const noTransactions =
  //   !isTransactionsLoading &&
  //   !isTransactionsFetching &&
  //   transactions?.length === 0

  return (
    <div className='flex min-h-[calc(100vh-57px-61px)]'>
      <aside className='w-[300px] border-r border-gray-300 p-4 hidden lg:block z-20 bg-white'>
        <DashboardAccountList
          handleCTA={() => navigate('/link-account')}
          handleAccountChange={handleAccountChange}
        />
      </aside>

      <div className='flex-1 flex flex-col h-[calc(100vh-61px-57px)]'>
        {selectedAccount ? (
          <>
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
                onClick={() => setView2('separate')}
                className={clsx(
                  'flex-1 py-2 px-4 cursor-pointer hover:bg-gray-50',
                  {
                    'bg-gray-50': view2 === 'separate',
                  }
                )}
              >
                Separate
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
                Grouped
              </div>
            </div>

            <div className='relative w-full h-full overflow-hidden'>
              <AnimatePresence initial={false}>
                {view2 === 'separate' && (
                  <motion.div
                    className='flex-1 flex flex-col absolute left-0 top-0 h-full w-full'
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <div className='p-4 border-b border-gray-300'>
                      <div className='space-y-4'>
                        {isTooltipActive && (
                          <DashboardIntervalDialog
                            showIntervals={view === 'line'}
                            search={search}
                            setSearch={setSearch}
                            category={category}
                            setCategory={setCategory}
                          />
                        )}

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

                            {/* <div
                              className={clsx(
                                'cursor-pointer hover:underline select-none',
                                { underline: view === 'monthly' }
                              )}
                              onClick={() => setView('monthly')}
                            >
                              Grouped
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex-1 overflow-y-scroll'>
                      {false ? (
                        <div className='h-full flex justify-center items-center'>
                          No Transactions
                        </div>
                      ) : (
                        <div className='w-full h-full'>
                          {view === 'line' ? (
                            <AccountTransactionGraph
                              isLoading={isTransactionsLoading}
                              transactions={transactions}
                            />
                          ) : view === 'monthly' ? (
                            <DashboardBarChart
                              isLoading={isGroupedAccountTransactionsLoading}
                              groupedAccountTransactions={groupedTransactions}
                            />
                          ) : (
                            <DashboardTransactionList
                              isLoading={isTransactionsLoading}
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
                      isLoading={isGroupedAccountTransactionsLoading}
                      groupedAccountTransactions={groupedTransactions}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
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
