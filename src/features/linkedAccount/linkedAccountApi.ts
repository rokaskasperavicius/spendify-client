import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'

// Types
import {
  GetLinkableAccount,
  GetLinkedAccount,
  GenerateAccountLinkUrl,
  GenerateAccountLinkUrlBody,
  GetLinkedTransaction,
  LinkAccountBody,
  GetInstitution,
} from 'features/linkedAccount/types'
import { SuccessResponse } from 'services/types'

const API_PREFIX = '/linked-account'

export const linkedAccountApi = createApi({
  reducerPath: 'linkedAccountsApi',
  baseQuery: baseQuery,
  tagTypes: ['LinkedAccounts'],

  endpoints: (builder) => ({
    getLinkedAccounts: builder.query<GetLinkedAccount[], void>({
      query: () => `${API_PREFIX}`,
      providesTags: ['LinkedAccounts'],

      transformResponse: (response: SuccessResponse<GetLinkedAccount[]>) =>
        response.data,
    }),

    getLinkableAccounts: builder.query<GetLinkableAccount[], string>({
      query: (ref) => `${API_PREFIX}/available-accounts/${ref}`,

      transformResponse: (response: SuccessResponse<GetLinkableAccount[]>) =>
        response.data,
    }),

    getInstitutions: builder.query<GetInstitution[], void>({
      query: () => `${API_PREFIX}/institutions`,

      transformResponse: (response: SuccessResponse<GetInstitution[]>) =>
        response.data,
    }),

    getLinkedTransactions: builder.query<
      GetLinkedTransaction[],
      { accountId: string; query: string }
    >({
      query: ({ accountId, query }) =>
        `${API_PREFIX}/transactions/${accountId}?${query}`,

      transformResponse: (response: SuccessResponse<GetLinkedTransaction[]>) =>
        response.data,
    }),

    generateAccountLinkUrl: builder.mutation<
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

    linkAccount: builder.mutation<{}, LinkAccountBody>({
      query: (body) => ({
        url: `${API_PREFIX}/connect`,
        method: 'POST',
        body,
      }),

      invalidatesTags: ['LinkedAccounts'],
      transformResponse: (response: SuccessResponse<{}>) => response.data,
    }),
  }),
})

export const {
  useGetLinkedAccountsQuery,
  useGetLinkableAccountsQuery,
  useGenerateAccountLinkUrlMutation,
  useGetInstitutionsQuery,
  useLinkAccountMutation,
  useGetLinkedTransactionsQuery,
} = linkedAccountApi
