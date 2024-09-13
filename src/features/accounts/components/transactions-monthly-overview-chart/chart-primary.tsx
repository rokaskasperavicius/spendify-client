import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

import { AccountTransactionsMonthlyOverviewResponse } from '@/features/accounts/accounts.types'

import { ChartTooltip } from './chart-tooltip'

type Props = {
  data: AccountTransactionsMonthlyOverviewResponse['data']
}

export const ChartPrimary = ({ data }: Props) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 70,
          bottom: 5,
        }}
      >
        <XAxis dataKey='date' />

        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f5f5f5' }} />

        <ReferenceLine y={0} stroke='#000' strokeWidth={1} />

        <Bar
          dataKey='incomeInt'
          fill='#ecf8f1'
          stroke='#163b23'
          maxBarSize={100}
        />

        <Bar
          dataKey='expensesInt'
          fill='#ffe5e5'
          stroke='#CC0000'
          strokeWidth={1}
          maxBarSize={100}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
