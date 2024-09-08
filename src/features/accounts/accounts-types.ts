import { components, paths } from '@/lib/generated'

export type TransactionCategories = components['schemas']['Categories']

/** [GET] /accounts */
type AccountsPath = paths['/accounts']['get']

export type AccountsResponse =
  AccountsPath['responses']['200']['content']['application/json']

export type Account = AccountsResponse['data']['accounts'][0]

export type AccountsParams = AccountsPath['parameters']['path']

/** [GET] /accounts/available/{ref} */
type AvailableAccountsPath = paths['/accounts/available/{requisitionId}']['get']

export type AvailableAccountsParams =
  AvailableAccountsPath['parameters']['path']

export type AvailableAccountsResponse =
  AvailableAccountsPath['responses']['200']['content']['application/json']

/** [GET] /accounts/institutions */
type InstitutionsPath = paths['/accounts/institutions']['get']

export type InstitutionsResponse =
  InstitutionsPath['responses']['200']['content']['application/json']

export type InstitutionsQuery = InstitutionsPath['parameters']['query']

/** [GET] /accounts/{accountId}/transactions */
type AccountTransactionsPath =
  paths['/accounts/{accountId}/transactions']['get']

export type AccountTransactionsParams =
  AccountTransactionsPath['parameters']['path']

export type AccountTransactionsQuery =
  AccountTransactionsPath['parameters']['query']

export type AccountTransactionsResponse =
  AccountTransactionsPath['responses']['200']['content']['application/json']

/** [GET] /accounts/{accountId}/transactions/grouped */
type AccountTransactionsGroupedPath =
  paths['/accounts/{accountId}/transactions/grouped']['get']

export type AccountTransactionsGroupedParams =
  AccountTransactionsGroupedPath['parameters']['path']

export type AccountTransactionsGroupedResponse =
  AccountTransactionsGroupedPath['responses']['200']['content']['application/json']

/** [POST] /accounts/create-requisition */
type InitiateConnectAccountPath = paths['/accounts/create-requisition']['post']

export type InitiateConnectAccountRequest =
  InitiateConnectAccountPath['requestBody']['content']['application/json']

export type InitiateConnectAccountResponse =
  InitiateConnectAccountPath['responses']['200']['content']['application/json']

/** [POST] /accounts */
type ConnectAccountPath = paths['/accounts']['post']

export type ConnectAccountRequest =
  ConnectAccountPath['requestBody']['content']['application/json']

export type ConnectAccountResponse =
  ConnectAccountPath['responses']['200']['content']['application/json']

/** [DELETE] /accounts */
type DeleteAccountPath = paths['/accounts']['delete']

export type DeleteAccountRequest =
  DeleteAccountPath['requestBody']['content']['application/json']

export type DeleteAccountResponse =
  DeleteAccountPath['responses']['200']['content']['application/json']

export type IntervalProps = {
  id: string
  from: number | null
  to: number | null
}
