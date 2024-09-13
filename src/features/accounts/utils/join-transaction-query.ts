import { AccountTransactionsQuery } from '../accounts.types'

/**
 * Joins all query parameters into a single string
 *
 * @param query object where keys are query parameters and values are query values
 * @returns one string with all query parameters joined by '&'
 */
export const joinTransactionQuery = (query: AccountTransactionsQuery) => {
  if (!query) return undefined

  const mapped = Object.keys(query).reduce((acc: string[], key) => {
    const queryKey = key as keyof typeof query

    if (query[queryKey]) {
      acc.push(`${key}=${query[queryKey]}`)
    }

    return acc
  }, [])

  return mapped.join('&')
}
