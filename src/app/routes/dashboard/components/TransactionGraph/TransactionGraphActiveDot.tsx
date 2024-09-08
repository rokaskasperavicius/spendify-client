import { CollectorLineDotProps } from './types'

type Props = {
  getActiveLineDot: () => CollectorLineDotProps | undefined
}

export const TransactionGraphActiveDot = ({ getActiveLineDot }: Props) => {
  const activeLineDot = getActiveLineDot()

  if (!activeLineDot) return null

  const { dotPayload } = activeLineDot

  return (
    <circle
      r={dotPayload.r}
      id={dotPayload.id}
      fill={dotPayload.stroke}
      strokeWidth={dotPayload.strokeWidth}
      stroke={dotPayload.stroke}
      width={dotPayload.width}
      height={dotPayload.height}
      cx={dotPayload.cx}
      cy={dotPayload.cy}
    ></circle>
  )
}
