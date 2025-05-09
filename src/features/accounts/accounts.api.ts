import { createApi } from '@reduxjs/toolkit/query/react'

import {
  AccountTransactionsMonthlyOverviewParams,
  AccountTransactionsMonthlyOverviewResponse,
  AccountTransactionsParams,
  AccountTransactionsQuery,
  AccountTransactionsResponse,
  AccountsParams,
  AccountsResponse,
  AvailableAccountsParams,
  AvailableAccountsQuery,
  AvailableAccountsResponse,
  ConnectAccountRequest,
  ConnectAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  InitiateConnectAccountRequest,
  InitiateConnectAccountResponse,
  InstitutionsQuery,
  InstitutionsResponse,
} from '@/features/accounts/accounts.types'

import { baseQuery } from '@/lib/api'

import { ACCOUNT_PATHS, ACCOUNT_TAGS } from './accounts.constants'
import { joinTransactionQuery } from './utils/join-transaction-query'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: baseQuery,
  tagTypes: Object.keys(ACCOUNT_TAGS),

  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse['data'], AccountsParams>({
      query: () => ACCOUNT_PATHS.GET_ACCOUNTS,
      providesTags: ['Accounts'],

      transformResponse: (response: AccountsResponse) => response.data,
    }),

    getAvailableAccounts: builder.query<
      AvailableAccountsResponse['data'],
      AvailableAccountsParams & AvailableAccountsQuery
    >({
      query: (query) =>
        ACCOUNT_PATHS.GET_AVAILABLE_ACCOUNTS(query.requisitionId, query.secret),

      transformResponse: (response: AvailableAccountsResponse) => response.data,
    }),

    getInstitutions: builder.query<
      InstitutionsResponse['data'],
      InstitutionsQuery
    >({
      query: (query) =>
        `${ACCOUNT_PATHS.GET_INSTITUTIONS}${query?.query ? `?query=${query.query}` : ''}`,

      transformResponse: (response: InstitutionsResponse) => response.data,
    }),

    getAccountTransactions: builder.query<
      AccountTransactionsResponse['data'],
      AccountTransactionsQuery & AccountTransactionsParams
    >({
      query: ({ accountId, ...query }) => {
        const joinedQuery = joinTransactionQuery(query)

        return `${ACCOUNT_PATHS.GET_TRANSACTIONS(accountId)}${joinedQuery ? `?${joinedQuery}` : ''}`
      },

      transformResponse: (response: AccountTransactionsResponse) =>
        response.data,
    }),

    getAccountTransactionsMonthlyOverview: builder.query<
      AccountTransactionsMonthlyOverviewResponse['data'],
      AccountTransactionsMonthlyOverviewParams
    >({
      query: ({ accountId }) =>
        ACCOUNT_PATHS.GET_TRANSACTIONS_GROUPED(accountId),
      providesTags: [ACCOUNT_TAGS.ACCOUNTS],

      transformResponse: (
        response: AccountTransactionsMonthlyOverviewResponse,
      ) => response.data,
    }),

    initiateConnectAccount: builder.mutation<
      InitiateConnectAccountResponse['data'],
      InitiateConnectAccountRequest
    >({
      query: (body) => ({
        url: ACCOUNT_PATHS.INITIATE_CONNECT_ACCOUNT,
        method: 'POST',
        body,
      }),

      transformResponse: (response: InitiateConnectAccountResponse) =>
        response.data,
    }),

    connectAccount: builder.mutation<
      ConnectAccountResponse,
      ConnectAccountRequest
    >({
      query: (body) => ({
        url: ACCOUNT_PATHS.CONNECT_ACCOUNT,
        method: 'POST',
        body,
      }),

      invalidatesTags: [ACCOUNT_TAGS.ACCOUNTS],
      transformErrorResponse: (response) => response.data,
    }),

    deleteAccount: builder.mutation<
      DeleteAccountResponse,
      DeleteAccountRequest
    >({
      query: (body) => ({
        url: ACCOUNT_PATHS.DELETE_ACCOUNT,
        method: 'DELETE',
        body,
      }),

      invalidatesTags: [ACCOUNT_TAGS.ACCOUNTS],
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useGetAvailableAccountsQuery,
  useInitiateConnectAccountMutation,
  useGetInstitutionsQuery,
  useConnectAccountMutation,
  useGetAccountTransactionsQuery,
  useDeleteAccountMutation,
  useGetAccountTransactionsMonthlyOverviewQuery,
} = accountsApi
