import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

import { RootState } from 'store'
import { userRoutes } from 'Main'
import { signOut, refreshAccessToken } from 'features/auth/slice'

type BaseQuery = {
  isRefresh: boolean
}

const baseQuery = ({ isRefresh }: BaseQuery) =>
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

export const apiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery({ isRefresh: false })(args, api, extraOptions)

  // Unauthenticated
  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery({ isRefresh: true })(
      {
        url: '/users/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    )) as QueryReturnValue<
      { data: { accessToken: string } },
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >

    if (refreshResult.data) {
      // Store the new access token
      api.dispatch(refreshAccessToken(refreshResult.data.data.accessToken))

      // Retry the initial query
      result = await baseQuery({ isRefresh: false })(args, api, extraOptions)
    } else {
      api.dispatch(signOut())
      userRoutes.navigate('/login')
    }
  }

  return result
}
