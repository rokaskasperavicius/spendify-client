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

type Props = {
  isLoading: boolean
  transactions: GetAccountTransactions | undefined
  groupedTransactions: AccountTransactionsGroupedProps | undefined
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
    <Spinner isLoading={isLoading}>
      <ResponsiveContainer>
        <LineChart
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
        </LineChart>
      </ResponsiveContainer>
    </Spinner>
  )
}
