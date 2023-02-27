import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'

// Types
import {
  GetLinkableAccount,
  GetLinkedAccount,
  GenerateAccountLinkUrl,
  GenerateAccountLinkUrlBody,
  LinkAccountBody,
  GetInstitution,
} from 'features/linkedAccounts/types'
import { SuccessResponse } from 'services/types'

const API_PREFIX = '/link-account'

export const linkedAccountsApi = createApi({
  reducerPath: 'linkedAccountsApi',
  baseQuery: baseQuery,
  tagTypes: ['LinkedAccounts'],

  endpoints: (builder) => ({
    getLinkedAccounts: builder.query<GetLinkedAccount[], void>({
      query: () => `${API_PREFIX}/accounts`,
      providesTags: ['LinkedAccounts'],

      transformResponse: (response: SuccessResponse<GetLinkedAccount[]>) =>
        response.data,
    }),

    getLinkableAccounts: builder.query<GetLinkableAccount[], string>({
      query: (ref) => `${API_PREFIX}/accounts/${ref}`,

      transformResponse: (response: SuccessResponse<GetLinkableAccount[]>) =>
        response.data,
    }),

    getInstitutions: builder.query<GetInstitution[], void>({
      query: () => `${API_PREFIX}/institutions`,

      transformResponse: (response: SuccessResponse<GetInstitution[]>) =>
        response.data,
    }),

    generateAccountLinkUrl: builder.mutation<
      GenerateAccountLinkUrl,
      GenerateAccountLinkUrlBody
    >({
      query: (body) => ({
        url: `${API_PREFIX}/url`,
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
} = linkedAccountsApi
