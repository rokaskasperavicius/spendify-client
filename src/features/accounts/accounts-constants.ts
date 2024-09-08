const PREFIX = '/accounts'

export const ACCOUNT_PATHS = {
  GET_ACCOUNTS: `${PREFIX}`,

  GET_AVAILABLE_ACCOUNTS: (requisitionId: string) =>
    `${PREFIX}/available/${requisitionId}`,

  GET_INSTITUTIONS: `${PREFIX}/institutions`,

  GET_TRANSACTIONS: (accountId: string) =>
    `${PREFIX}/${accountId}/transactions`,

  GET_TRANSACTIONS_GROUPED: (accountId: string) =>
    `${PREFIX}/${accountId}/transactions/grouped`,

  INITIATE_CONNECT_ACCOUNT: `${PREFIX}/create-requisition`,
  CONNECT_ACCOUNT: `${PREFIX}`,
  DELETE_ACCOUNT: `${PREFIX}`,
}

export enum ACCOUNT_TAGS {
  ACCOUNTS = 'Accounts',
}
