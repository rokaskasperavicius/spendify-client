import { useNavigate } from 'react-router-dom'
import { subMonths, format } from 'date-fns'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { useWindowSize } from 'react-use'

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
  useGetAccountTransactionsMutation,
  useGetAccountTransactionsGroupedQuery,
} from 'features/account/accountApi'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'components/ui'
import { DashboardTransactionList } from './DashboardTransactionList'

import { filterIntervals } from 'features/account/utils'

// Types
import {
  GetAccountTransactions,
  GetLinkedAccount,
} from 'features/account/types'
import { useAccountSlice } from 'features/account/accountSlice'

import { Breakpoints } from 'lib/constants'
import clsx from 'clsx'

export const Dashboard = () => {
  const { data: linkedAccounts, isLoading } = useGetAccountsQuery()
  const { intervals } = useAccountSlice()

  const screenWidth = useWindowSize().width

  const filteredIntervals = useMemo(
    () => filterIntervals(intervals),
    [intervals]
  )

  const [transactions, setTransactions] = useState<GetAccountTransactions>()

  const [selectedAccount, setSelectedAccount] = useState<GetLinkedAccount>()
  const accountId = selectedAccount?.accountId
  const {
    data: groupedTransactions,
    isLoading: isGroupedAccountTransactionsLoading,
  } = useGetAccountTransactionsGroupedQuery(accountId ?? skipToken)

  const [view, setView] = useState<'list' | 'line' | 'monthly'>('monthly')

  const [isTooltipActive, setIsTooltipActive] = useState(true)

  const navigate = useNavigate()

  // const [value, onChange] = useState([subMonths(new Date(), 1), new Date()])

  const [search, setSearch] = useState<string>()
  const [option, setOption] = useState<string>()

  const generateQuery = async () => {
    filteredIntervals.forEach((a) => {
      console.log(new Date(a.from))
      console.log(new Date(a.to))
    })
    // const query = []

    // if (search) {
    //   query.push(`search=${search}`)
    // }

    // if (option) {
    //   query.push(`category=${encodeURIComponent(option)}`)
    // }

    // return query.join('&')
    if (!accountId) return

    try {
      const data = await getAccountTransactions({
        accountId: accountId,
        search: search || '',
        intervals: filteredIntervals,
      }).unwrap()

      setTransactions(data)
    } catch (err) {
      console.error(err)
    }
  }

  const [query, setQuery] = useState<string>('')

  useDebounce(
    () => {
      generateQuery()
    },
    400,
    [search, option, filteredIntervals, selectedAccount]
  )

  const handleAccountChange = (accountId: string) => {
    const account = linkedAccounts?.find(
      (account) => account.accountId === accountId
    )

    setSelectedAccount(account)
  }

  const [getAccountTransactions, { isLoading: isTransactionsLoading }] =
    useGetAccountTransactionsMutation()

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
    <div className='flex min-h-[calc(100vh-57px-60px)]'>
      <aside className='w-[300px] border-r border-gray-300 p-4 hidden lg:block'>
        <DashboardAccountList
          handleCTA={() => navigate('/link-account')}
          handleAccountChange={handleAccountChange}
        />
      </aside>

      <div
        className='flex-1 flex flex-col h-[calc(100vh-60px-57px)]'
        // onScroll={(e) => console.log(e)}
        // onScroll={(e) => {
        //   let ele = document.getElementsByClassName('recharts-yAxis')[0]
        //   ele.style = 'transform: translateX(' + e.target.scrollLeft + 'px);'
        // }}
      >
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
            <div className='p-4 border-b border-gray-300'>
              <div className='space-y-4'>
                {isTooltipActive && <DashboardIntervalDialog />}

                <div className='flex justify-between items-center'>
                  <div
                    className='cursor-pointer hover:underline'
                    onClick={() => setIsTooltipActive((isActive) => !isActive)}
                  >
                    {isTooltipActive ? 'Hide' : 'Expand'}
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

                    <div
                      className={clsx(
                        'cursor-pointer hover:underline select-none',
                        { underline: view === 'monthly' }
                      )}
                      onClick={() => setView('monthly')}
                    >
                      Monthly
                    </div>
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
                      groupedTransactions={groupedTransactions}
                      // ?.slice()
                      // .sort((result, next) => next.weight - result.weight)}
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
                        transactions ? transactions[0].transactions : undefined
                      }
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
