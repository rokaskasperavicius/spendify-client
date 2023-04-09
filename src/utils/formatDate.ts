import { format } from 'date-fns'

export const formatDate = (date: number | string) =>
  format(new Date(date), 'yyyy-MM-dd')
