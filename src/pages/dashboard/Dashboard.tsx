import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useNavigate } from 'react-router-dom'
import { addDays, addMonths, format, subMonths } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import { useDebounce } from 'react-use'

// Assets
import ChartIcon from 'assets/chart.svg'
import ListIcon from 'assets/list.svg'

// Components
import { Input, Select } from 'components/ui'

import {
  useGetLinkedAccountsQuery,
  useGetLinkedTransactionsQuery,
} from 'features/linkedAccounts/linkedAccountsApi'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'components'

const pastMonth = new Date(2023, 1, 27)
const data = [
  { name: '1st, 2023', value: 400 },
  { name: '2nd, 2023', value: 500 },
  { name: '3rd, 2023', value: 800 },
  { name: '5th, 2023', value: 100 },
  { name: '6th, 2023', value: 100 },
  { name: '7th, 2023', value: 100 },
  { name: '8th, 2023', value: 200 },
  { name: '9th, 2023', value: 500 },
  { name: '10th, 2023', value: 800 },
  { name: '11h, 2023', value: 900 },
  { name: '12th, 2023', value: 100 },
  { name: '13th, 2023', value: 100 },
  { name: '14th, 2023', value: 300 },
  { name: '15th, 2023', value: 100 },
  { name: '16th, 2023', value: 100 },
  { name: '17th, 2023', value: 600 },
  { name: '18th, 2023', value: 700 },
  { name: '19th, 2023', value: 800 },
  { name: '20th, 2023', value: 100 },
  { name: '21th, 2023', value: 800 },
  { name: '22th, 2023', value: 800 },
  { name: '22th, 2023', value: 100 },
  { name: '23th, 2023', value: 100 },
  { name: '24th, 2023', value: 100 },
  { name: '25th, 2023', value: 300 },
  { name: '26th, 2023', value: 400 },
  { name: '27th, 2023', value: 700 },
  { name: '28th, 2023', value: 900 },
]

const Skeleton = () => (
  <div role='status'>
    <div className='flex gap-4 items-center'>
      <div className='w-[70px] h-[70px] bg-gray-200 animate-pulse rounded-sm' />

      <div className='flex-1 animate-pulse'>
        <div className='h-2 bg-gray-200 rounded-full w-2/3' />
        <div className='h-2 bg-gray-200 rounded-full text-sm mt-1' />
      </div>
    </div>
    <span className='sr-only'>Loading...</span>
  </div>
)

export const Dashboard = () => {
  const { data: linkedAccounts, isLoading } = useGetLinkedAccountsQuery()
  const [view, setView] = useState<'list' | 'chart'>('list')
  const navigate = useNavigate()

  const defaultSelected: DateRange = {
    from: subMonths(pastMonth, 1),
    to: pastMonth,
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  const initialDays: Date[] = []
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays)
  const [value, onChange] = useState([subMonths(new Date(), 1), new Date()])

  const accountId = '2f5c19ae-6f74-4d6b-8b02-07c678d1ede6'

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
      query.push(`from=${value[0].getTime()}&to=${value[1].getTime()}`)
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

  const { data: transactions, isFetching } = useGetLinkedTransactionsQuery({
    accountId,
    query: query,
  })

  console.log(isFetching)
  return (
    <div className='flex h-full'>
      <aside className='w-[300px] border-r border-gray-300 p-4 space-y-4'>
        <div>Linked Accounts</div>

        {isLoading ? (
          <Skeleton />
        ) : (
          linkedAccounts?.map((account) => (
            <div
              key={account.id}
              className='flex gap-4 items-center cursor-pointer group'
            >
              <div className='h-[70px] w-[70px]'>
                <img src={account.bankLogo} width={70} alt='bank' />
              </div>

              <div>
                <div className='group-hover:underline'>
                  {account.accountName}
                </div>
                <div className='text-gray-500 text-sm mt-1'>
                  {account.accountIban}
                </div>
              </div>
            </div>
          ))
        )}

        <button
          className='bg-primary px-4 py-2 rounded-md w-full text-white'
          onClick={() => navigate('/link-account')}
        >
          Link a new Account
        </button>
      </aside>

      <div className='flex-1 flex flex-col'>
        <div className='p-4 border-b border-gray-300'>
          <div className='flex text-lg items-center justify-between font-medium'>
            <div>Studiekonto</div>
            <div>2899.71 DKK</div>
          </div>
          <div className='text-gray-500 mt-1'>DK4404004025963089</div>
        </div>
        <div className='p-4 border-b border-gray-300'>
          <div className='flex items-center justify-between'>
            <div className='flex items-stretch gap-4'>
              {view === 'list' && (
                <>
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
                </>
              )}

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

        <div className='flex-1'>
          <Spinner isLoading={isFetching}>
            {view === 'chart' ? (
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
                >
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='#8884d8'
                    animationDuration={3000}
                  />
                  <XAxis dataKey='name' minTickGap={20} />
                  <YAxis
                    orientation='right'
                    // axisLine={false}
                    // tickLine={false}
                    width={30}
                    mirror={true}
                    padding={{ top: 0, bottom: 20 }}
                    label={{ value: 'kr.', position: 'right' }}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div>
                {transactions?.map((transaction) => (
                  <div className='flex items-center justify-between p-4'>
                    <div>
                      <div>
                        <span className='font-medium'>{transaction.title}</span>{' '}
                        ({transaction.category})
                      </div>
                      <div className='text-sm'>{transaction.date}</div>
                    </div>
                    <div className='font-medium'>{transaction.amount} DKK</div>
                  </div>
                ))}
              </div>
            )}
          </Spinner>
        </div>
      </div>
    </div>
  )
}
