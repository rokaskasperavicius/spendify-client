// Types
import { CollectorLineDotProps } from './types'

type Props = {
  getActiveLineDot: () => CollectorLineDotProps | undefined
}

export const TransactionGraphCursor = ({ getActiveLineDot }: Props) => {
  const activeLineDot = getActiveLineDot()
  if (!activeLineDot) return null

  const { dotPayload } = activeLineDot

  return (
    <line
      x1={dotPayload.cx}
      y1={0}
      x2={dotPayload.cx}
      y2={dotPayload.height + 10}
      strokeWidth={1}
      stroke='#ccc'
    />
  )
}
