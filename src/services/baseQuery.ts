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
import { signUserOut, setUserTokens } from 'features/auth/authSlice'

import { toast } from 'react-toastify'

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
    const refreshResult = (await query({ isRefresh: true })(
      {
        url: '/auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    )) as QueryReturnValue<
      { data: { accessToken: string; refreshToken: string } },
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >

    if (refreshResult.data) {
      // Store the new access token
      const payload = refreshResult.data.data
      api.dispatch(setUserTokens(payload))

      // Retry the initial query
      result = await query({ isRefresh: false })(args, api, extraOptions)
    } else {
      toast.error('Session timeout', { toastId: 'session-timeout' })
      api.dispatch(signUserOut())
      userRoutes.navigate('/login')
    }
  }

  if (
    result.error &&
    result.error.status !== 400 &&
    result.error.status !== 401
  ) {
    toast.error('Something went wrong', { toastId: 'general-error' })
  }

  return result
}
