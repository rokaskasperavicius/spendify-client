import { LineDotProps } from './types'

export const TransactionGraphDot = (lineDotProps: LineDotProps) => (
  <circle
    r={lineDotProps.r}
    stroke={lineDotProps.stroke}
    strokeWidth={lineDotProps.strokeWidth}
    fill={lineDotProps.fill}
    fillOpacity={1}
    width={lineDotProps.width}
    height={lineDotProps.height}
    cx={lineDotProps.cx}
    cy={lineDotProps.cy}
  ></circle>
)
