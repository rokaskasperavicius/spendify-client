import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from 'recharts'
import { skipToken } from '@reduxjs/toolkit/query/react'

import { useNavigate } from 'react-router-dom'
import { subMonths, format } from 'date-fns'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import { useDebounce } from 'react-use'

// Assets
import ChartIcon from 'assets/chart.svg'
import ListIcon from 'assets/list.svg'

// Components
import { Input, Select } from 'components/ui'
import {
  LinkedAccount,
  LinkedAccountSkeleton,
  LinkedAccountTransaction,
  LinkedAccountTransactionSkeleton,
} from 'features/linkedAccount/components'

import {
  useGetLinkedAccountsQuery,
  useGetLinkedTransactionsQuery,
} from 'features/linkedAccount/linkedAccountApi'
import React, { useState } from 'react'
import { Spinner, Button } from 'components/ui'

// Types
import {
  GetLinkedTransaction,
  GetLinkedAccount,
} from 'features/linkedAccount/types'

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

  const { data: transactions, isFetching } = useGetLinkedTransactionsQuery(
    {
      accountId: accountId as string,
      query: query,
    },
    { skip: !accountId }
  )

  console.log(transactions)
  return (
    <div className='flex min-h-[calc(100vh-57px-60px)]'>
      <aside className='w-[300px] border-r border-gray-300 p-4 space-y-4'>
        <div>Linked Accounts</div>

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

      <div className='flex-1 flex flex-col'>
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
                maxDate={new Date()}
              />
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
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 relative'>
          {/* <Spinner isLoading={isFetching}> */}
          {view === 'chart' ? (
            <ResponsiveContainer>
              <LineChart
                data={transactions
                  ?.slice()
                  .sort(
                    (
                      result: GetLinkedTransaction,
                      next: GetLinkedTransaction
                    ) => next.weight - result.weight
                  )}
                margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
              >
                <Line
                  type='monotone'
                  dataKey='totalAmountInt'
                  stroke='#163b23'
                  animationDuration={3000}
                  strokeWidth={2}
                />
                <XAxis dataKey='date' minTickGap={20} />
                <YAxis
                  orientation='right'
                  // axisLine={false}
                  // tickLine={false}
                  width={30}
                  mirror={true}
                  padding={{ top: 0, bottom: 20 }}
                  label={{ value: 'kr.', position: 'right' }}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>
              {isFetching
                ? [...Array(10)].map((_, index) => (
                    <LinkedAccountTransactionSkeleton key={index} />
                  ))
                : transactions?.map(({ id, amount, category, date, title }) => (
                    <LinkedAccountTransaction
                      key={id}
                      title={title}
                      amount={amount}
                      category={category}
                      date={date}
                    />
                  ))}
            </div>
          )}
          {/* </Spinner> */}
        </div>
      </div>
    </div>
  )
}

const CustomTooltip = ({ payload, active }: any) => {
  const data =
    payload && (payload[0]?.payload as GetLinkedTransaction | undefined)

  if (active && data) {
    return (
      <div className='border border-primary rounded-md p-4 bg-background-transparent flex gap-6'>
        <div>
          <span className='font-medium'>{data.title}</span> ({data.category})
          <div className='text-gray-500'>{data.date}</div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='font-medium'>{data.amount} DKK</div>
          <div className='text-gray-500'>{data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}
