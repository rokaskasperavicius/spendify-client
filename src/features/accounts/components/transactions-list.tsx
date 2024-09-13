import { AccountTransactionsResponse } from '@/features/accounts/accounts.types'

import { formatDate } from '@/utils/format-date'

import { Transaction } from './transaction'
import { TransactionSkeleton } from './transaction-skeleton'

type Props = {
  isLoading: boolean
  transactions: AccountTransactionsResponse['data'] | undefined
}

export const TransactionsList = ({ isLoading, transactions }: Props) => {
  if (isLoading) {
    return (
      <>
        {[...Array(10)].map((_, index) => (
          <TransactionSkeleton key={index} />
        ))}
      </>
    )
  }

  return (
    <>
      {transactions?.map(
        ({ id, amount, category, date, title, totalAmount }) => (
          <Transaction
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
