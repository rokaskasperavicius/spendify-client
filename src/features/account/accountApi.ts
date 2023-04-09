import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'
import { formatDate } from 'utils/formatDate'

// Types
import {
  GetLinkableAccount,
  GetLinkedAccount,
  GenerateAccountLinkUrl,
  GenerateAccountLinkUrlBody,
  GetAccountTransactions,
  LinkAccountBody,
  GetInstitution,
  DeleteAccountBody,
  GetAccountTransactionsGrouped,
} from 'features/account/types'
import { SuccessResponse } from 'services/types'
const API_PREFIX = '/accounts'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQuery,
  tagTypes: ['Accounts'],

  endpoints: (builder) => ({
    getAccounts: builder.query<GetLinkedAccount[], void>({
      query: () => `${API_PREFIX}`,
      providesTags: ['Accounts'],

      transformResponse: (response: SuccessResponse<GetLinkedAccount[]>) =>
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

    getAccountTransactions: builder.mutation<
      GetAccountTransactions,
      {
        accountId: string
        search: string
        intervals: Array<{ id: string; from: number; to: number }>
      }
    >({
      query: (body) => ({
        url: `${API_PREFIX}/transactions`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: SuccessResponse<GetAccountTransactions>) =>
        response.data,
    }),

    getAccountTransactionsGrouped: builder.query<
      GetAccountTransactionsGrouped[],
      string
    >({
      query: (accountId) => `${API_PREFIX}/${accountId}/transactions/grouped`,
      providesTags: ['Accounts'],

      transformResponse: (
        response: SuccessResponse<GetAccountTransactionsGrouped[]>
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
      transformResponse: (response: SuccessResponse<{}>) => response.data,
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
  useGetAccountTransactionsMutation,
  useDeleteAccountMutation,
  useGetAccountTransactionsGroupedQuery,
} = accountApi
