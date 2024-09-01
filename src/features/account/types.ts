type TransactionCategories = 'Food & Groceries' | 'Utilities' | 'Transfers'

/** GET /accounts/ */
export type AccountsResponse = {
  accounts: Account[]
}

export type Account = {
  id: string
  balance: string
  name: string | null
  iban: string | null
  institutionName: string | null
  institutionLogo: string | null
  lastSyncedAt: Date
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
  accountName: string | undefined
  accountIban: string | undefined
  accountBalance: string
  institutionLogo: string
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
  name: string
  logo: string
}

export type GetAccountTransactions = AccountTransactionProps[]

export type AccountTransactionProps = {
  weight: number
  id: string
  amount: string
  amountInt: number
  totalAmount: string
  totalAmountInt: number
  title: string
  category: TransactionCategories
  date: Date
}

export type IntervalProps = {
  id: string
  from: number | null
  to: number | null
}
