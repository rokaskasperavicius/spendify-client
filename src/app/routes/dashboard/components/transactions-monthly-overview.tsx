import { motion } from 'framer-motion'

import { Loader } from '@/components/ui'

import { useGetAccountTransactionsMonthlyOverviewQuery } from '@/features/accounts/accounts.api'
import { TransactionsMonthlyOverviewChart } from '@/features/accounts/components/transactions-monthly-overview-chart/transactions-monthly-overview-chart'

type Props = {
  accountId: string
}

export const TransactionsMonthlyOverview = ({ accountId }: Props) => {
  const { data, isFetching: isLoading } =
    useGetAccountTransactionsMonthlyOverviewQuery({ accountId })

  return (
    <motion.div
      className='absolute left-0 top-0 h-full w-full'
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
    >
      <Loader isLoading={isLoading || !data} rootClassName='h-full'>
        {data && <TransactionsMonthlyOverviewChart data={data} />}
      </Loader>
    </motion.div>
  )
}
