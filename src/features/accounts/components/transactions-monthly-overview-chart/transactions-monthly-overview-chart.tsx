import { AccountTransactionsMonthlyOverviewResponse } from '@/features/accounts/accounts.types'

import { ChartPrimary } from './chart-primary'
import { ChartYAxis } from './chart-y-axis'

type Props = {
  data: AccountTransactionsMonthlyOverviewResponse['data']
}

export const TransactionsMonthlyOverviewChart = ({ data }: Props) => {
  const minWidth = data.length * 150

  return (
    <div className='relative w-full h-full'>
      <div className='absolute h-full w-full z-20 overflow-x-scroll no-scroll'>
        <div className='h-full' style={{ minWidth }}>
          <ChartPrimary data={data} />
        </div>
      </div>

      <div className='h-full absolute z-50 w-[71px] top-0 left-0'>
        <ChartYAxis data={data} />
      </div>
    </div>
  )
}
