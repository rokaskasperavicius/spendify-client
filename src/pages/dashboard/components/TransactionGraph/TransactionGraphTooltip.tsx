import { formatDate } from '@/utils/formatDate'

import { graphColors } from './constants'
import { CollectorLineDotProps } from './types'

type Props = {
  active: boolean | undefined
  getActiveLineDot: () => CollectorLineDotProps | undefined
}

export const TransactionGraphTooltip = ({
  active,
  getActiveLineDot,
}: Props) => {
  const activeLineDot = getActiveLineDot()

  const data = activeLineDot && activeLineDot.transactionPayload

  if (active && data) {
    return (
      <div
        className='space-y-1 border-2 rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl text-sm md:text-base'
        style={{ borderColor: graphColors[activeLineDot.lineIndex] }}
      >
        <div className='flex gap-2'>
          <div className='font-medium truncate'>{data.title}</div>
          <div className='shrink-0 font-medium'>{data.amount} DKK</div>
        </div>

        <div>({data.category})</div>

        <div className='flex justify-between gap-4'>
          <div className='text-gray-500'>{formatDate(data.date)}</div>
          <div className='text-gray-500'>Balance: {data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}
