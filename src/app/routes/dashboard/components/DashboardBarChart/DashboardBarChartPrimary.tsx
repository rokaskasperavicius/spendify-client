import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

import { AccountTransactionsGroupedResponse } from '@/features/accounts/accounts-types'

import { DashboardBarChartTooltip } from './DashboardBarChartTooltip'

type Props = {
  groupedAccountTransactions: AccountTransactionsGroupedResponse['data']
}

export const DashboardBarChartPrimary = ({
  groupedAccountTransactions,
}: Props) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={groupedAccountTransactions}
        margin={{
          top: 5,
          right: 0,
          left: 70,
          bottom: 5,
        }}
      >
        <XAxis dataKey='date' />
        <Tooltip
          content={<DashboardBarChartTooltip />}
          cursor={{ fill: '#f5f5f5' }}
        />
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
