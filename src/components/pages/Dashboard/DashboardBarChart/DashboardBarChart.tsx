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

export const DashboardBarChart = ({
  isLoading,
  groupedAccountTransactions,
}: Props) => {
  if (!groupedAccountTransactions) return null

  return (
    <Spinner isLoading={isLoading}>
      <div className='relative w-full h-full'>
        <div className='absolute h-full w-full z-20 overflow-x-scroll no-scroll'>
          <div className='w-[3500px] h-full'>
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
