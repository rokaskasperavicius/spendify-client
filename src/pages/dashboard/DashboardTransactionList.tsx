// Components
import {
  LinkedAccountTransaction,
  LinkedAccountTransactionSkeleton,
} from 'features/linkedAccount/components'

// Types
import { GetLinkedTransaction } from 'features/linkedAccount/types'

type Props = {
  isLoading: boolean
  transactions: GetLinkedTransaction[] | undefined
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
      {transactions?.map(({ id, amount, category, date, title }) => (
        <LinkedAccountTransaction
          key={id}
          title={title}
          amount={amount}
          category={category}
          date={date}
        />
      ))}
    </>
  )
}
