import { ErrorResponse } from '@/lib/types'

/**
 * Type predicate to narrow an unknown error to `ErrorResponse`
 */
export const isFetchBaseQueryError = (
  error: unknown,
): error is ErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'success' in error
  )
}
