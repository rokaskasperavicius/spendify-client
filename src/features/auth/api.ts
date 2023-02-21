import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Login = {
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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://spendify.fly.dev/api/users' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: { data: LoginResponse }, meta, arg) =>
        response.data,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi
