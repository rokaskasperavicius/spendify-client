import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'

// Types
import {
  GetLinkableAccount,
  GetLinkedAccounts,
  GenerateAccountLinkUrl,
  GenerateAccountLinkUrlBody,
  GetAccountTransactions,
  LinkAccountBody,
  GetInstitution,
  DeleteAccountBody,
  AccountTransactionsGroupedProps,
} from 'features/account/types'
import { SuccessResponse } from 'services/types'
const API_PREFIX = '/accounts'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQuery,
  tagTypes: ['Accounts'],

  endpoints: (builder) => ({
    getAccounts: builder.query<GetLinkedAccounts, void>({
      query: () => `${API_PREFIX}`,
      providesTags: ['Accounts'],

      transformResponse: (response: SuccessResponse<GetLinkedAccounts>) =>
        response.data,
    }),

    getAvailableAccounts: builder.query<GetLinkableAccount[], string>({
      query: (ref) => `${API_PREFIX}/available-accounts/${ref}`,

      transformResponse: (response: SuccessResponse<GetLinkableAccount[]>) =>
        response.data,
    }),

    getInstitutions: builder.query<GetInstitution[], void>({
      query: () => `${API_PREFIX}/institutions`,

      transformResponse: (response: SuccessResponse<GetInstitution[]>) =>
        response.data,
    }),

    getAccountTransactions: builder.query<
      GetAccountTransactions,
      {
        accountId: string
        query: string
      }
    >({
      query: ({ accountId, query }) =>
        `${API_PREFIX}/${accountId}/transactions?${query}`,

      transformResponse: (response: SuccessResponse<GetAccountTransactions>) =>
        response.data,
    }),

    getAccountTransactionsGrouped: builder.query<
      AccountTransactionsGroupedProps,
      string
    >({
      query: (accountId) => `${API_PREFIX}/${accountId}/transactions/grouped`,
      providesTags: ['Accounts'],

      transformResponse: (
        response: SuccessResponse<AccountTransactionsGroupedProps>
      ) => response.data,
    }),

    getAccountConnectUrl: builder.mutation<
      GenerateAccountLinkUrl,
      GenerateAccountLinkUrlBody
    >({
      query: (body) => ({
        url: `${API_PREFIX}/create-requisition`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: SuccessResponse<GenerateAccountLinkUrl>) =>
        response.data,
    }),

    connectAccount: builder.mutation<{}, LinkAccountBody>({
      query: (body) => ({
        url: `${API_PREFIX}`,
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Accounts'],
      transformErrorResponse: (response) => response.data,
    }),

    deleteAccount: builder.mutation<{}, DeleteAccountBody>({
      query: (body) => ({
        url: `${API_PREFIX}`,
        method: 'DELETE',
        body,
      }),

      invalidatesTags: ['Accounts'],
      transformResponse: (response: SuccessResponse<{}>) => response.data,
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useGetAvailableAccountsQuery,
  useGetAccountConnectUrlMutation,
  useGetInstitutionsQuery,
  useConnectAccountMutation,
  useGetAccountTransactionsQuery,
  useDeleteAccountMutation,
  useGetAccountTransactionsGroupedQuery,
} = accountApi
