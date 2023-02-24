import { createApi } from '@reduxjs/toolkit/query/react'

import { apiQuery } from 'services/api'

type Login = {
  email: string | undefined
  password: string | undefined
}

type Register = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  password: string | undefined
}

type LoginResponse = {
  accessToken: string
  refreshToken: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiQuery,
  endpoints: (builder) => ({
    getLinkedAccounts: builder.query<any, void>({
      query: () => `/nordigen/accounts`,

      transformResponse: (response: { data: any }) => response.data,
    }),

    login: builder.mutation<LoginResponse, Login>({
      query: (body) => ({
        url: `/users/login`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: { data: LoginResponse }) => response.data,
    }),

    register: builder.mutation<{}, Register>({
      query: (body) => ({
        url: `/users/register`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: { data: {} }) => response.data,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetLinkedAccountsQuery,
} = authApi
