import { AccountTransactionsResponse } from '@/features/accounts/accounts-types'

export type CollectorLineDotProps = {
  lineIndex: number

  dotPayload: Omit<LineDotProps, 'payload'>
  transactionPayload: AccountTransactionsResponse['data'][0]
}

export type LineDotProps = {
  id: string
  r: number
  cx: number
  cy: number
  fill: string
  stroke: string
  strokeWidth: number
  height: number
  value: number
  width: number
  index: number
  payload: AccountTransactionsResponse['data'][0]
}

export type LineCursorProps = {
  className: string
  stroke: string
}

export type TooltipProps = {
  active?: boolean
}
