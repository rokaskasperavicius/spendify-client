import { createApi } from '@reduxjs/toolkit/query/react'

import {
  DestroySessionBody,
  GetSessionsResponse,
  LoginUser,
  LoginUserResponse,
  PatchUserInfoBody,
  PatchUserInfoResponse,
  PatchUserPasswordBody,
  RegisterUser,
} from '@/features/auth/types'

import { baseQuery } from '@/services/baseQuery'
import { SuccessResponse } from '@/services/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Devices'],

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

    registerUser: builder.mutation<SuccessResponse<object>, RegisterUser>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    destroySession: builder.mutation<
      SuccessResponse<object>,
      DestroySessionBody
    >({
      query: (body) => ({
        url: `/auth/destroy-session`,
        method: 'DELETE',
        body,
      }),
    }),

    logOut: builder.mutation<SuccessResponse<object>, void>({
      query: (body) => ({
        url: `/auth/log-out`,
        method: 'POST',
        body,
      }),
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
      SuccessResponse<object>,
      PatchUserPasswordBody
    >({
      query: (body) => ({
        url: `/auth/user-password`,
        method: 'PATCH',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    getSessions: builder.query<GetSessionsResponse, void>({
      query: () => '/auth/sessions',
      providesTags: ['Devices'],
      keepUnusedDataFor: 0,

      transformResponse: (response: SuccessResponse<GetSessionsResponse>) =>
        response.data,
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  usePatchUserInfoMutation,
  usePatchUserPasswordMutation,
  useDestroySessionMutation,
  useLogOutMutation,
  useGetSessionsQuery,
} = authApi
