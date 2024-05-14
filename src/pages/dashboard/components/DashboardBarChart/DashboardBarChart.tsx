import { Spinner } from '@/components/ui'

import { AccountTransactionsGroupedProps } from '@/features/account/types'

import { DashboardBarChartPrimary } from './DashboardBarChartPrimary'
import { DashboardBarChartYAxis } from './DashboardBarChartYAxis'

type Props = {
  isLoading: boolean
  groupedAccountTransactions: AccountTransactionsGroupedProps | undefined
}

export const DashboardBarChart = ({
  isLoading,
  groupedAccountTransactions,
}: Props) => {
  if (!groupedAccountTransactions || isLoading) {
    return (
      <Spinner
        isLoading={isLoading || !groupedAccountTransactions}
        rootClassName='h-full flex justify-center items-center'
      />
    )
  }

  const length = groupedAccountTransactions.length * 150

  return (
    <div className='relative w-full h-full'>
      <div className='absolute h-full w-full z-20 overflow-x-scroll no-scroll'>
        <div className='h-full' style={{ minWidth: length }}>
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
  )
}
