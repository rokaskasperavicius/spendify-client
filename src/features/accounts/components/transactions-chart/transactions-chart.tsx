import millify from 'millify'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Loader } from '@/components/ui'

import { AccountTransactionsResponse } from '@/features/accounts/accounts.types'

import { formatDate } from '@/utils/format-date'

import { ChartTooltip } from './chart-tooltip'

type Props = {
  isLoading: boolean
  transactions: AccountTransactionsResponse['data'] | undefined
}

export const TransactionsChart = ({ isLoading, transactions }: Props) => {
  return (
    <Loader isLoading={isLoading} rootClassName='h-full'>
      <ResponsiveContainer>
        <LineChart
          data={transactions}
          margin={{ top: 10, right: 10, bottom: 0, left: 10 }}
        >
          <YAxis
            orientation='right'
            width={30}
            mirror={true}
            padding={{ top: 0, bottom: 20 }}
            tickFormatter={(value) => millify(value)}
          />

          <Line
            type='monotone'
            dataKey='totalAmountInt'
            stroke='#163b23'
            animationDuration={400}
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 3 }}
          />

          <XAxis dataKey={(value) => formatDate(value.date)} />

          <Tooltip content={<ChartTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </Loader>
  )
}
