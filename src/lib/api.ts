import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

import { API_BASE_URL } from '../config/constants'

const query = () =>
  fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/v1`,
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

    api.dispatch({ type: 'auth/resetAuth' })

    toast.error('Session timeout', { toastId: 'session-timeout' })
  }

  if (
    result.error &&
    typeof result.error.status === 'number' &&
    result.error.status >= 500
  ) {
    toast.error('Unexpected Error', {
      toastId: 'general-error',
    })
  }

  return result
}
