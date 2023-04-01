// Components
import {
  LinkedAccountTransaction,
  LinkedAccountTransactionSkeleton,
} from 'features/account/components'

// Types
import { AccountTransactionProps } from 'features/account/types'

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
