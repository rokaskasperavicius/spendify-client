type TransactionCategories = 'Food & Groceries' | 'Utilities' | 'Transfers'

export type GetLinkedAccount = {
  id: number
  accountId: string
  accountBalance: string
  accountName: string
  accountIban: string
  bankName: string
  bankLogo: string
}

export type AccountTransactionsGroupedProps = Array<{
  date: string
  expenses: string
  income: string
  expensesInt: number
  incomeInt: number
}>

export type GetLinkableAccount = {
  accountId: string
  accountBalance: string
  accountName: string
  accountIban: string
  bankLogo: string
}

export type GenerateAccountLinkUrl = {
  url: string
}

export type GenerateAccountLinkUrlBody = {
  institutionId: string
  redirect: string
}

export type LinkAccountBody = {
  accountId: string
}

export type DeleteAccountBody = {
  accountId: string
}

export type GetInstitution = {
  id: string
  bankName: string
  bankLogo: string
}

export type GetAccountTransactions = {
  id: string
  transactions: AccountTransactionProps[]
}[]

export type AccountTransactionProps = {
  weight: number
  id: string
  title: string
  category: TransactionCategories
  amount: string
  amountInt: string
  totalAmount: string
  totalAmountInt: number
  date: number
}

export type IntervalProps = {
  id: string
  from: number | undefined
  to: number | undefined
}
