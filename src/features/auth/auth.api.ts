import { createApi } from '@reduxjs/toolkit/query/react'

import {
  DestroySessionRequest,
  DestroySessionResponse,
  LogOutRequest,
  LogOutResponse,
  LoginUserRequest,
  LoginUserResponse,
  PatchUserInfoRequest,
  PatchUserInfoResponse,
  PatchUserPasswordRequest,
  PatchUserPasswordResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  SessionsParams,
  SessionsResponse,
} from '@/features/auth/auth.types'

import { baseQuery } from '@/lib/api'

import { AUTH_PATHS, AUTH_TAGS } from './auth.constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: Object.values(AUTH_TAGS),

  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserResponse['data'], LoginUserRequest>({
      query: (body) => ({
        url: AUTH_PATHS.LOGIN,
        method: 'POST',
        body,
      }),

      transformResponse: (response: LoginUserResponse) => response.data,
      transformErrorResponse: (response) => response.data,
    }),

    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (body) => ({
        url: AUTH_PATHS.REGISTER,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    destroySession: builder.mutation<
      DestroySessionResponse,
      DestroySessionRequest
    >({
      query: (body) => ({
        url: AUTH_PATHS.DESTROY_SESSION,
        method: 'DELETE',
        body,
      }),
    }),

    logOut: builder.mutation<LogOutResponse, LogOutRequest>({
      query: (body) => ({
        url: AUTH_PATHS.LOG_OUT,
        method: 'POST',
        body,
      }),
    }),

    patchUserInfo: builder.mutation<
      PatchUserInfoRequest,
      PatchUserInfoResponse['data']
    >({
      query: (body) => ({
        url: AUTH_PATHS.USER_INFO,
        method: 'PATCH',
        body,
      }),

      transformResponse: (response: PatchUserInfoResponse) => response.data,
      transformErrorResponse: (response) => response.data,
    }),

    patchUserPassword: builder.mutation<
      PatchUserPasswordResponse,
      PatchUserPasswordRequest
    >({
      query: (body) => ({
        url: AUTH_PATHS.USER_PASSWORD,
        method: 'PATCH',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    getSessions: builder.query<SessionsResponse['data'], SessionsParams>({
      query: () => AUTH_PATHS.SESSIONS,
      providesTags: [AUTH_TAGS.DEVICES],
      keepUnusedDataFor: 0,

      transformResponse: (response: SessionsResponse) => response.data,
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
