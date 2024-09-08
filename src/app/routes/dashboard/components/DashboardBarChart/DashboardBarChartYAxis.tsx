import millify from 'millify'
import { Bar, BarChart, ResponsiveContainer, YAxis } from 'recharts'

import { AccountTransactionsGroupedResponse } from '@/features/accounts/accounts-types'

type Props = {
  groupedAccountTransactions: AccountTransactionsGroupedResponse['data']
}

const tickFormatter = (value: number) => {
  return millify(value)
}

export const DashboardBarChartYAxis = ({
  groupedAccountTransactions,
}: Props) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={groupedAccountTransactions}
        margin={{
          top: 5,
          right: 0,
          left: 10,
          bottom: 5,
        }}
      >
        <Bar dataKey='expensesInt' />
        <Bar dataKey='incomeInt' />

        {/* White overlay under the y-axis */}
        <rect width='70' height='100%' fill='#FFFFFF' />

        <YAxis tickFormatter={tickFormatter} />
      </BarChart>
    </ResponsiveContainer>
  )
}
