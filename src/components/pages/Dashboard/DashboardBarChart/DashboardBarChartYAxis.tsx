import { BarChart, Bar, YAxis, ResponsiveContainer } from 'recharts'
import millify from 'millify'

// Types
import { AccountTransactionsGroupedProps } from 'features/account/types'

type Props = {
  groupedAccountTransactions: AccountTransactionsGroupedProps
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
          right: 30,
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