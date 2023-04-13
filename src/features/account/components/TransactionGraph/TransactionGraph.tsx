import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import millify from 'millify'

// Components
import { Spinner } from 'components/ui'
import { TransactionGraphDot } from './TransactionGraphDot'
import { TransactionGraphActiveDot } from './TransactionGraphActiveDot'
import { TransactionGraphTooltip } from './TransactionGraphTooltip'
import { TransactionGraphCursor } from './TransactionGraphCursor'

// Helpers
import { TransactionGraphCollector } from 'features/account/components/TransactionGraph/transactionGraphCollector'
import { formatDate } from 'utils/formatDate'

// Constants
import { graphColors } from 'features/account/components/TransactionGraph/constants'

// Types
import {
  GetAccountTransactions,
  AccountTransactionProps,
  AccountTransactionsGroupedProps,
} from 'features/account/types'

import { LineDotProps } from './types'

import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  // XAxis,
  // YAxis,
  CartesianGrid,
  // Tooltip,
  Legend,
  // ResponsiveContainer,
} from 'recharts'

const TransactionGraphTooltipp = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className='border border-black rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl'>
        <p className='font-medium'>{label}</p>
        <p className='text-error-red'>Expenses: {data.expenses} DKK</p>
        <p className='text-primary'>Income: {data.income} DKK</p>
      </div>
    )
  }

  return null
}

const tickFormatter = (value: number) => millify(value)

const Test = ({
  transactions,
}: {
  transactions: AccountTransactionsGroupedProps[]
}) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={transactions}
        margin={{
          top: 5,
          right: 30,
          left: 70,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='date' className='absolute' />
        <Tooltip
          content={<TransactionGraphTooltipp />}
          cursor={{ fill: '#f5f5f5' }}
        />
        {/* <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} /> */}
        <ReferenceLine y={0} stroke='#000' strokeWidth={1} />
        {/* <Brush dataKey='name' height={30} stroke='#8884d8' /> */}
        <Bar
          dataKey='expensesInt'
          fill='#ffe5e5'
          stroke='#CC0000'
          strokeWidth={1}
        />
        {/* fill='#DE3163' fill='#008080' */}
        <Bar
          dataKey='incomeInt'
          fill='#ecf8f1'
          stroke='#163b23'
          strokeWidth={1}
        />
        {/* <YAxis
          // domain={[0, 10000000000000000]}
          // allowDataOverflow={true}
          tickFormatter={tickFormatter}
          type='number'
          // domain={[0, 155000]}
          // tick={<Hi />}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

const Test2 = ({
  transactions,
}: {
  transactions: AccountTransactionsGroupedProps[]
}) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={10}
        // width={500}
        height={300}
        data={transactions}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        {/* <XAxis dataKey='date' className='absolute' />
        <Tooltip /> */}
        {/* <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} /> */}
        {/* <ReferenceLine y={0} stroke='#000' /> */}
        {/* <Brush dataKey='name' height={30} stroke='#8884d8' /> */}
        <Bar dataKey='expensesInt' fill='#CC0000' />
        <Bar dataKey='incomeInt' fill='#163b23' />
        <rect
          width='70'
          height='100%'
          fill='#FFFFFF'
          // style='fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)'
        />
        <YAxis
          // allowDataOverflow={true}
          // domain={[0, 100000]}
          tickFormatter={tickFormatter}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

type Props = {
  isLoading: boolean
  transactions: GetAccountTransactions | undefined
  groupedTransactions: AccountTransactionsGroupedProps[] | undefined
}

export const TransactionGraph = ({
  isLoading,
  transactions,
  groupedTransactions,
}: Props) => {
  const TRANSACTION_COLLECTOR = new TransactionGraphCollector()

  const setActiveLineDot = (x: number | undefined, y: number | undefined) => {
    TRANSACTION_COLLECTOR.setActiveLineDot(x || 0, y || 0)
  }

  const isOnePeriod = transactions?.length === 1

  const renderTransactionGraphDot = (
    lineIndex: number,
    lineDotProps: LineDotProps
  ) => {
    const { payload, ...restLineDotProps } = lineDotProps

    const lineDots = TRANSACTION_COLLECTOR.getLineDots()

    const doesLineDotExist = lineDots.find(
      (lineDot) =>
        lineDot.dotPayload.cx === restLineDotProps.cx &&
        lineIndex === lineDot.lineIndex
    )

    if (!doesLineDotExist) {
      TRANSACTION_COLLECTOR.pushLineDot({
        lineIndex,
        transactionPayload: payload,
        dotPayload: restLineDotProps,
      })
    }

    return <TransactionGraphDot {...lineDotProps} />
  }

  if (!groupedTransactions) return null

  return (
    <Spinner isLoading={false}>
      {/* <div className='w-[1000px] h-full'> */}
      {/* <Test /> */}
      {/* </div> */}
      {/* <ResponsiveContainer> */}
      {/* <LineChart
          onMouseMove={(e) => setActiveLineDot(e.chartX, e.chartY)}
          margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
        >
          {transactions?.map((transaction, index) => (
            <Line
              key={transaction.id}
              dot={(lineDotProps: LineDotProps) =>
                renderTransactionGraphDot(index, lineDotProps)
              }
              activeDot={
                <TransactionGraphActiveDot
                  getActiveLineDot={TRANSACTION_COLLECTOR.getActiveLineDot}
                />
              }
              id={transaction.id}
              xAxisId={transaction.id}
              data={transaction.transactions}
              type='monotone'
              dataKey={(transaction: AccountTransactionProps) =>
                isOnePeriod ? transaction.totalAmountInt : transaction.amountInt
              }
              stroke={graphColors[index]}
              animationDuration={400}
              strokeWidth={2}
            />
          ))}

          {transactions?.map((transaction) => (
            <XAxis
              key={transaction.id}
              xAxisId={transaction.id}
              hide={!isOnePeriod}
              dataKey={(transaction: AccountTransactionProps) =>
                formatDate(transaction.date)
              }
            />
          ))}

          <YAxis
            orientation='right'
            width={30}
            mirror={true}
            padding={{ top: 0, bottom: 20 }}
            label={{ value: 'DKK', position: 'right' }}
          />

          <Tooltip
            cursor={
              <TransactionGraphCursor
                getActiveLineDot={TRANSACTION_COLLECTOR.getActiveLineDot}
              />
            }
            content={({ active }) => (
              <TransactionGraphTooltip
                active={active}
                getActiveLineDot={TRANSACTION_COLLECTOR.getActiveLineDot}
              />
            )}
          />
        </LineChart> */}
      {/* </ResponsiveContainer> */}
      <div className='relative h-full w-full'>
        <div className='h-full w-full overflow-x-scroll test z-20 absolute'>
          <div className='w-[3500px] h-full overflow-x-scroll test'>
            <Test transactions={groupedTransactions} />
          </div>
        </div>

        {/* <div className='absolute left-0 z-10 h-full w-11 bg-white' /> */}

        <div className='h-full absolute z-50 w-[71px] top-0 left-0'>
          <Test2 transactions={groupedTransactions} />
        </div>
      </div>
    </Spinner>
  )
}
