import { AccountTransactionProps } from '@/features/account/types'

import { formatDate } from '@/utils/formatDate'

import { LinkedAccountTransaction, LinkedAccountTransactionSkeleton } from '.'

type Props = {
  isLoading: boolean
  transactions: AccountTransactionProps[] | undefined
}

export const DashboardTransactionList = ({
  isLoading,
  transactions,
}: Props) => {
  if (isLoading) {
    return (
      <>
        {[...Array(10)].map((_, index) => (
          <LinkedAccountTransactionSkeleton key={index} />
        ))}
      </>
    )
  }

  return (
    <>
      {transactions?.map(
        ({ id, amount, category, date, title, totalAmount }) => (
          <LinkedAccountTransaction
            key={id}
            title={title}
            amount={amount}
            totalAmount={totalAmount}
            category={category}
            date={formatDate(date)}
          />
        ),
      )}
    </>
  )
}
