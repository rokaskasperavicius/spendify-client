import millify from 'millify'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Spinner } from '@/components/ui'

import { AccountTransactionsResponse } from '@/features/accounts/accounts-types'

import { formatDate } from '@/utils/format-date'

import { TransactionGraphActiveDot } from './TransactionGraphActiveDot'
import { TransactionGraphCursor } from './TransactionGraphCursor'
import { TransactionGraphDot } from './TransactionGraphDot'
import { TransactionGraphTooltip } from './TransactionGraphTooltip'
import { graphColors } from './constants'
import { TransactionGraphCollector } from './transactionGraphCollector'
import { LineDotProps } from './types'

const tickFormatter = (value: number) => millify(value)

type Props = {
  isLoading: boolean
  transactions: AccountTransactionsResponse['data'] | undefined
}

export const TransactionGraph = ({ isLoading, transactions: trans }: Props) => {
  const formatted = [
    {
      id: 'main',
      transactions: trans,
    },
  ]
  const TRANSACTION_COLLECTOR = new TransactionGraphCollector()

  const setActiveLineDot = (x: number | undefined, y: number | undefined) => {
    TRANSACTION_COLLECTOR.setActiveLineDot(x || 0, y || 0)
  }

  const renderTransactionGraphDot = (
    lineIndex: number,
    lineDotProps: LineDotProps & { key: string },
  ) => {
    const { payload, ...restLineDotProps } = lineDotProps
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key: _, ...ignoreKey } = lineDotProps

    const lineDots = TRANSACTION_COLLECTOR.getLineDots()
    const doesLineDotExist = lineDots.find(
      (lineDot) =>
        lineDot.dotPayload.cx === restLineDotProps.cx &&
        lineIndex === lineDot.lineIndex,
    )

    // If line dot already exists, replace the same line dot
    // with the correct y axis coordinate which could be different
    if (doesLineDotExist) {
      const lineDotIndex = lineDots.findIndex(
        (lineDot) => lineDot === doesLineDotExist,
      )

      TRANSACTION_COLLECTOR.replaceLineDot(lineDotIndex, {
        lineIndex,
        transactionPayload: payload,
        dotPayload: restLineDotProps,
      })
    } else {
      TRANSACTION_COLLECTOR.pushLineDot({
        lineIndex,
        transactionPayload: payload,
        dotPayload: restLineDotProps,
      })
    }

    return <TransactionGraphDot {...ignoreKey} />
  }

  return (
    <Spinner
      isLoading={isLoading}
      rootClassName='h-full flex justify-center items-center'
    >
      <ResponsiveContainer>
        <LineChart
          onMouseMove={(e) => setActiveLineDot(e.chartX, e.chartY)}
          margin={{ top: 10, right: 10, bottom: 0, left: 10 }}
        >
          <YAxis
            orientation='right'
            width={30}
            mirror={true}
            padding={{ top: 0, bottom: 20 }}
            // label={{ value: 'DKK', position: 'right' }}
            tickFormatter={tickFormatter}
          />

          {formatted?.map((transaction, index) => (
            <Line
              key={transaction.id}
              dot={(lineDotProps: LineDotProps & { key: string }) =>
                renderTransactionGraphDot(index, lineDotProps)
              }
              activeDot={
                <TransactionGraphActiveDot
                  getActiveLineDot={TRANSACTION_COLLECTOR.getActiveLineDot}
                />
              }
              id={transaction.id}
              xAxisId={transaction.id}
              data={transaction.transactions
                ?.slice()
                .sort((result, next) => result.weight - next.weight)}
              type='monotone'
              dataKey={(transaction: AccountTransactionsResponse['data'][0]) =>
                transaction.totalAmountInt
              }
              stroke={graphColors[index]}
              animationDuration={400}
              strokeWidth={2}
            />
          ))}

          {formatted?.map((transaction) => (
            <XAxis
              key={transaction.id}
              xAxisId={transaction.id}
              dataKey={(transaction: AccountTransactionsResponse['data'][0]) =>
                formatDate(transaction.date)
              }
            />
          ))}

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
