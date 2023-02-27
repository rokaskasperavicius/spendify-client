import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'

// Types
import { LoginUser, LoginUserResponse, RegisterUser } from 'features/auth/types'
import { SuccessResponse } from 'services/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserResponse, LoginUser>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: SuccessResponse<LoginUserResponse>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),

    registerUser: builder.mutation<SuccessResponse<{}>, RegisterUser>({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
