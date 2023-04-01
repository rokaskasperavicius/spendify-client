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

  if (active && data) {
    return (
      <div
        className='border-2 rounded-md p-4 bg-white flex gap-6'
        style={{ borderColor: graphColors[activeLineDot.lineIndex] }}
      >
        <div>
          <span className='font-medium'>{data.title}</span> ({data.category})
          <div className='text-gray-500'>{data.date}</div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='font-medium'>{data.amount} DKK</div>
          <div className='text-gray-500'>{data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}
