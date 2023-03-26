import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Components
import { Spinner } from 'components/ui'

// Types
import { GetLinkedTransaction } from 'features/account/types'

import theme from 'styles/theme'

type Props = {
  isLoading: boolean
  transactions: GetLinkedTransaction[] | undefined
}

export const DashboardTransactionGraph = ({
  isLoading,
  transactions,
}: Props) => {
  console.log(transactions)
  return (
    <Spinner isLoading={isLoading}>
      <ResponsiveContainer>
        <LineChart
          data={transactions}
          margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
        >
          <Line
            type='monotone'
            dataKey='totalAmountInt'
            stroke={theme?.colors?.primary as string}
            animationDuration={3000}
            strokeWidth={2}
          />
          <XAxis dataKey='date' minTickGap={20} />
          <YAxis
            orientation='right'
            // axisLine={false}
            // tickLine={false}
            width={30}
            mirror={true}
            padding={{ top: 0, bottom: 20 }}
            label={{ value: 'DKK', position: 'right' }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </Spinner>
  )
}

const CustomTooltip = ({ payload, active }: any) => {
  const data =
    payload && (payload[0]?.payload as GetLinkedTransaction | undefined)

  if (active && data) {
    return (
      <div className='border border-primary rounded-md p-4 bg-background-transparent flex gap-6'>
        <div>
          <span className='font-medium'>{data.title}</span> ({data.category})
          <div className='text-gray-500'>{data.date}</div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='font-medium'>{data.amount} DKK</div>
          <div className='text-gray-500'>{data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}
