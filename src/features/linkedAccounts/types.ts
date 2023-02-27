export type GetLinkedAccount = {
  id: number
  requisitionId: string
  accountId: string
  accountBalance: string
  accountName: string
  accountIban: string
  bankName: string
  bankLogo: string
}

export type GetLinkableAccount = {
  requisitionId: string
  accountId: string
  accountBalance: string
  accountName: string
  accountIban: string
}

export type GenerateAccountLinkUrl = {
  url: string
}

export type GenerateAccountLinkUrlBody = {
  institutionId: string
  redirect: string
}

export type LinkAccountBody = {
  requisitionId: string
  accountId: string
}

export type GetInstitution = {
  id: string
  bankName: string
  bankLogo: string
}

export type GetLinkedTransaction = {
  title: string
  category: 'Food & Groceries' | 'Utilities' | 'Transfers'
  amount: string
  date: string
}
