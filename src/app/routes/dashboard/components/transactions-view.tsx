import subMonths from 'date-fns/subMonths'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'react-use'

import { useGetAccountTransactionsQuery } from '@/features/accounts/accounts.api'
import { TransactionCategories } from '@/features/accounts/accounts.types'
import { TransactionsChart } from '@/features/accounts/components/transactions-chart/transactions-chart'
import { TransactionsList } from '@/features/accounts/components/transactions-list'

import { formatInputDate } from '@/utils/format-date'

import { TransactionFilter } from './transaction-filter'
import { TransactionsViewSwitch } from './transactions-view-switch'

type Props = {
  accountId: string
}

export const TransactionsView = ({ accountId }: Props) => {
  const [view, setView] = useState<'list' | 'line'>('list')

  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchValue = searchParams.get('search') ?? ''
  const categoryValue = searchParams.get('category') ?? ''
  const from =
    searchParams.get('from') ?? formatInputDate(subMonths(new Date(), 1))
  const to = searchParams.get('to')

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue)
  useDebounce(
    () => {
      setDebouncedSearch(searchValue)
    },
    400,
    [searchValue],
  )

  const { data: transactions, isFetching: isTransactionsFetching } =
    useGetAccountTransactionsQuery({
      accountId: accountId as string,
      search: debouncedSearch,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(to).toISOString() : undefined,
      category: categoryValue
        ? (encodeURIComponent(categoryValue) as TransactionCategories)
        : undefined,
    })

  const updateSearchParams = (key: string, value: string) => {
    setSearchParams((params) => {
      params.set(key, value)
      return params
    })
  }

  const deleteSearchParams = (key: string) => {
    setSearchParams((params) => {
      params.delete(key)
      return params
    })
  }

  const onFilterReset = () => {
    deleteSearchParams('search')
    deleteSearchParams('category')
    deleteSearchParams('from')
    deleteSearchParams('to')
  }

  return (
    <motion.div
      className='absolute inset-0 flex flex-col'
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <div className='p-4 border-b border-gray-300'>
        <div>
          <TransactionFilter
            isCollapsed={isFilterCollapsed}
            updateSearchParams={updateSearchParams}
            deleteSearchParams={deleteSearchParams}
            searchValue={searchValue}
            categoryValue={categoryValue}
            from={from}
            to={to}
          />

          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div
                className='cursor-pointer hover:underline'
                onClick={() => setIsFilterCollapsed((prop) => !prop)}
              >
                {isFilterCollapsed ? 'Filter' : 'Hide'}
              </div>

              {!isFilterCollapsed && (
                <div
                  className='cursor-pointer hover:underline'
                  onClick={onFilterReset}
                >
                  Reset
                </div>
              )}
            </div>

            <TransactionsViewSwitch view={view} setView={setView} />
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-scroll'>
        {transactions && transactions.length === 0 ? (
          <div className='h-full flex justify-center items-center'>
            No Transactions
          </div>
        ) : (
          <div className='h-full'>
            {view === 'line' ? (
              <TransactionsChart
                isLoading={isTransactionsFetching}
                transactions={transactions}
              />
            ) : (
              <TransactionsList
                isLoading={isTransactionsFetching}
                transactions={transactions}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
