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
  GetAccountTransactionsGrouped,
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

const data = [
  { name: '1', uv: 300, pv: 456 },
  { name: '2', uv: -145, pv: 230 },
  { name: '3', uv: -100, pv: 345 },
  { name: '4', uv: -8, pv: 450 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '8', uv: 252, pv: -378 },
  { name: '9', uv: 79, pv: -210 },
  { name: '10', uv: 294, pv: -23 },
  { name: '12', uv: 43, pv: 45 },
  { name: '13', uv: -74, pv: 90 },
  { name: '14', uv: -71, pv: 130 },
  { name: '15', uv: -117, pv: 11 },
  { name: '16', uv: -186, pv: 107 },
  { name: '17', uv: -16, pv: 926 },
  { name: '18', uv: -125, pv: 653 },
  { name: '19', uv: 222, pv: 366 },
  { name: '20', uv: 372, pv: 486 },
  { name: '21', uv: 182, pv: 512 },
  { name: '22', uv: 164, pv: 302 },
  { name: '23', uv: 316, pv: 425 },
  { name: '24', uv: 131, pv: 467 },
  { name: '25', uv: 291, pv: -190 },
  { name: '26', uv: -47, pv: 194 },
  { name: '27', uv: -415, pv: 371 },
  { name: '28', uv: -182, pv: 376 },
  { name: '29', uv: -93, pv: 295 },
  { name: '30', uv: -99, pv: 322 },
  { name: '31', uv: -52, pv: 246 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
  { name: '35', uv: -25, pv: 359 },
  { name: '36', uv: -59, pv: 192 },
  { name: '37', uv: -63, pv: 464 },
  { name: '38', uv: -91, pv: -2 },
  { name: '39', uv: -66, pv: 154 },
  { name: '40', uv: -50, pv: 186 },
]

const TransactionGraphTooltipp = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className='border-2 border-black rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl'>
        <p className='font-medium'>{label}</p>
        <p className='text-error-red'>Expenses: {data.expenses} DKK</p>
        <p className='text-primary'>Income: {data.income} DKK</p>
      </div>
    )
  }

  return null
}

const tickFormatter = (value: number, index: number) => {
  // console.log(value)
  // const limit = 10 // put your maximum character
  // if (`${value}`.length < limit) return value
  // return `${`${value}`.substring(0, limit)}...`

  return millify(value)
}

const Test = ({
  transactions,
}: {
  transactions: GetAccountTransactionsGrouped[]
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
        <ReferenceLine y={0} stroke='#000' strokeWidth={2} />
        {/* <Brush dataKey='name' height={30} stroke='#8884d8' /> */}
        <Bar
          dataKey='expensesInt'
          fill='#ffe5e5'
          stroke='#CC0000'
          strokeWidth={2}
        />
        {/* fill='#DE3163' fill='#008080' */}
        <Bar
          dataKey='incomeInt'
          fill='#ecf8f1'
          stroke='#163b23'
          strokeWidth={2}
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

const Hi = ({ ...props }: any) => {
  console.log(props)
  return null
}

const Test2 = ({
  transactions,
}: {
  transactions: GetAccountTransactionsGrouped[]
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
  groupedTransactions: GetAccountTransactionsGrouped[] | undefined
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
