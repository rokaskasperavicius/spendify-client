import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

import { RootState } from 'store'
import { userRoutes } from 'components/Main'
import { setUserTokens, resetStore } from 'features/auth/authSlice'

import { toast } from 'react-toastify'

let refreshQuery:
  | QueryReturnValue<
      {
        data: {
          accessToken: string
          refreshToken: string
        }
      },
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >
  | undefined = undefined

type BaseQuery = {
  isRefresh: boolean
}

const query = ({ isRefresh }: BaseQuery) =>
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken, refreshToken } = (getState() as RootState).auth

      headers.set(
        'Authorization',
        `Bearer ${isRefresh ? refreshToken : accessToken}`
      )

      return headers
    },
  })

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await query({ isRefresh: false })(args, api, extraOptions)

  // Unauthenticated
  if (result.error && result.error.status === 401) {
    // if (!refreshQuery) {
    refreshQuery = query({ isRefresh: true })(
      {
        url: '/auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    ) as QueryReturnValue<
      { data: { accessToken: string; refreshToken: string } },
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >
    // }

    const refreshResult = await refreshQuery

    if (refreshResult.data) {
      // Store the new access token
      const payload = refreshResult.data.data
      api.dispatch(setUserTokens(payload))

      // Retry the initial query
      result = await query({ isRefresh: false })(args, api, extraOptions)
    } else {
      toast.error('Session timeout', { toastId: 'session-timeout' })

      // If this block gets called, that means the refresh token was not found,
      // therefore, we can send an empty refresh token to the backend
      api.dispatch(resetStore())

      userRoutes.navigate('/login')
    }

    // refreshQuery = undefined
  }

  if (
    result.error &&
    result.error.status !== 400 &&
    result.error.status !== 401
  ) {
    toast.error('Unexpected Error', {
      toastId: 'general-error',
    })
  }

  return result
}
