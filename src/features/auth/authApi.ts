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
  SignOutUserBody,
  GetUserDevicesResponse,
} from 'features/auth/types'
import { SuccessResponse } from 'services/types'

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

    registerUser: builder.mutation<SuccessResponse<{}>, RegisterUser>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response) => response.data,
    }),

    signOutUser: builder.mutation<SuccessResponse<{}>, SignOutUserBody>({
      query: (body) => ({
        url: `/auth/sign-out`,
        method: 'DELETE',
        body,
      }),

      invalidatesTags: ['Devices'],
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

    getUserDevices: builder.query<GetUserDevicesResponse, void>({
      query: () => '/auth/devices',
      providesTags: ['Devices'],

      transformResponse: (response: SuccessResponse<GetUserDevicesResponse>) =>
        response.data,
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  usePatchUserInfoMutation,
  usePatchUserPasswordMutation,
  useSignOutUserMutation,
  useGetUserDevicesQuery,
} = authApi
