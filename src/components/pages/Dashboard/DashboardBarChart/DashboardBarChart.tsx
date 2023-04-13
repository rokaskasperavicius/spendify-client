import { BarChart, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import millify from 'millify'

// Components
import { Spinner } from 'components/ui'
import { DashboardBarChartPrimary } from './DashboardBarChartPrimary'
import { DashboardBarChartYAxis } from './DashboardBarChartYAxis'

// Types
import { AccountTransactionsGroupedProps } from 'features/account/types'

type Props = {
  isLoading: boolean
  groupedAccountTransactions: AccountTransactionsGroupedProps | undefined
}

const tickFormatter = (value: number) => millify(value)

export const DashboardBarChart = ({
  isLoading,
  groupedAccountTransactions,
}: Props) => {
  if (!groupedAccountTransactions) return null

  return (
    <Spinner isLoading={isLoading}>
      <div className='relative h-full w-full'>
        <div className='h-full w-full overflow-x-scroll test z-20 absolute'>
          <div className='w-[3500px] h-full overflow-x-scroll test'>
            <DashboardBarChartPrimary
              groupedAccountTransactions={groupedAccountTransactions}
            />
          </div>
        </div>

        <div className='h-full absolute z-50 w-[71px] top-0 left-0'>
          <DashboardBarChartYAxis
            groupedAccountTransactions={groupedAccountTransactions}
          />
        </div>
      </div>
    </Spinner>
  )
}
