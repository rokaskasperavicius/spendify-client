import millify from 'millify'
import { Bar, BarChart, ResponsiveContainer, YAxis } from 'recharts'

import { AccountTransactionsMonthlyOverviewResponse } from '@/features/accounts/accounts.types'

type Props = {
  data: AccountTransactionsMonthlyOverviewResponse['data']
}

export const ChartYAxis = ({ data }: Props) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
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

        <YAxis tickFormatter={(value) => millify(value)} />
      </BarChart>
    </ResponsiveContainer>
  )
}
