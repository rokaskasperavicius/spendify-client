import { TooltipProps } from 'recharts'

import { formatDate } from '@/utils/format-date'

export const ChartTooltip = ({
  active,
  payload,
}: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div
        className='space-y-1 border-2 rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl text-sm md:text-base'
        style={{ borderColor: '#163b23' }}
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
