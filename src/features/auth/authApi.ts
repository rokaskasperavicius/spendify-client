import { createApi } from '@reduxjs/toolkit/query/react'

// Helpers
import { baseQuery } from 'services/baseQuery'

// Types
import {
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  PatchUserInfoBody,
  PatchUserInfoResponse,
  PatchUserPasswordBody,
} from 'features/auth/types'
import { SuccessResponse } from 'services/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserResponse, LoginUser>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),

      transformResponse: (response: SuccessResponse<LoginUserResponse>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),

    registerUser: builder.mutation<SuccessResponse<{}>, RegisterUser>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    patchUserInfo: builder.mutation<PatchUserInfoBody, PatchUserInfoResponse>({
      query: (body) => ({
        url: `/auth/user-info`,
        method: 'PATCH',
        body,
      }),

      transformResponse: (response: SuccessResponse<PatchUserInfoBody>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),

    patchUserPassword: builder.mutation<
      SuccessResponse<{}>,
      PatchUserPasswordBody
    >({
      query: (body) => ({
        url: `/auth/user-password`,
        method: 'PATCH',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  usePatchUserInfoMutation,
  usePatchUserPasswordMutation,
} = authApi
