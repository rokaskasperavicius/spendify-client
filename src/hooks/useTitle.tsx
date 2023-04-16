import { useTitle as reactUseTitle } from 'react-use'

/**
 * Update the document title with a provided string
 */
export const useTitle = (title: string) => {
  reactUseTitle(`${title} | Spendify`)
}
