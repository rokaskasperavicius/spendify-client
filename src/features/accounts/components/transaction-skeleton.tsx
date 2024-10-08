import clsx from 'clsx'
import { useState } from 'react'

const TITLE_WIDTHS = ['w-1/2', 'w-1/4', 'w-2/6', 'w-1/6']
const getRandomWidth = () => TITLE_WIDTHS[Math.floor(Math.random() * 4)]

export const TransactionSkeleton = () => {
  const [width] = useState(getRandomWidth())

  return (
    <div className='flex justify-between px-4 py-6 animate-pulse items-start'>
      <div className='flex-1'>
        <div className={clsx('h-3 bg-gray-200 rounded-full', width)} />

        <div className='h-2 bg-gray-200 rounded-full w-16 mt-2' />
      </div>

      <div className='h-3 bg-gray-200 rounded-full w-16' />
    </div>
  )
}
