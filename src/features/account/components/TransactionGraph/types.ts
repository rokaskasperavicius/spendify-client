// Types
import { AccountTransactionProps } from 'features/account/types'

export type CollectorLineDotProps = {
  lineIndex: number

  dotPayload: Omit<LineDotProps, 'payload'>
  transactionPayload: AccountTransactionProps
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
  payload: AccountTransactionProps
}

export type LineCursorProps = {
  className: string
  stroke: string
}

export type TooltipProps = {
  active?: boolean
}
