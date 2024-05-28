import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

import { userRoutes } from '@/components/Main'

import { resetAuth } from '@/features/auth/authSlice'

import { API_BASE_URL } from '@/lib/constants'

const query = () =>
  fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  })

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await query()(args, api, extraOptions)

  // Unauthenticated
  if (result.error && result.error.status === 401) {
    await query()({ url: '/auth/log-out', method: 'POST' }, api, extraOptions)

    api.dispatch(resetAuth())
    toast.error('Session timeout', { toastId: 'session-timeout' })
    userRoutes.navigate('/login')

    toast.error('Session timeout', { toastId: 'session-timeout' })
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
