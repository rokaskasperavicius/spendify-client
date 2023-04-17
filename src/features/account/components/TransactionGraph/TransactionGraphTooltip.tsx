// Helpers
import { formatDate } from 'utils/formatDate'

// Types
import { CollectorLineDotProps } from './types'

// Constants
import { graphColors } from './constants'

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

  // const data = {
  //   title: 'asdasdasdasd asd asd asd a khgjgjgj hgkghkgh',
  //   amount: '2200.00',
  //   date: 132300900000,
  //   totalAmount: '100000.00',
  // }
  // const activeLineDot = { lineIndex: 0 }

  if (active && data) {
    return (
      <div
        className='border-2 rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl'
        style={{ borderColor: graphColors[activeLineDot.lineIndex] }}
      >
        <div className='flex gap-2'>
          <div className='font-medium truncate'>{data.title}</div>
          <div className='shrink-0 font-medium'>{data.amount} DKK</div>
        </div>
        {/* {data.category}) */}
        <div className='mt-1'>(Food & Groceries)</div>

        <div className='flex justify-between gap-4'>
          <div className='text-gray-500'>{formatDate(data.date)}</div>
          <div className='text-gray-500'>{data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}
