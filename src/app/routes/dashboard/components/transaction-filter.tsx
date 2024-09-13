import clsx from 'clsx'

import { Input, Select } from '@/components/ui'

import { formatInputDate } from '@/utils/format-date'

type Props = {
  isCollapsed: boolean
  from: string | null
  to: string | null
  searchValue: string
  categoryValue: string
  updateSearchParams: (key: string, value: string) => void
  deleteSearchParams: (key: string) => void
}

export const TransactionFilter = ({
  isCollapsed,
  from,
  to,
  searchValue,
  categoryValue,
  updateSearchParams,
  deleteSearchParams,
}: Props) => {
  const inputFrom = from ? formatInputDate(from) : ''
  const inputTo = to ? formatInputDate(to) : ''

  return (
    <div
      className={clsx('flex gap-4 flex-col overflow-hidden transition-all', {
        'max-h-0 mb-0': isCollapsed,
        'max-h-[200px] mb-4': !isCollapsed,
      })}
    >
      <Input
        className='flex-1'
        value={searchValue}
        onChange={(e) => updateSearchParams('search', e.target.value)}
        placeholder='Search for Transactions...'
      />

      <Select
        value={categoryValue}
        onChange={(e) => updateSearchParams('category', e.target.value)}
      />

      <div className='flex items-center gap-2'>
        <Input
          className='flex-1 w-full'
          type='date'
          value={inputFrom}
          max={inputTo}
          onChange={(e) => {
            if (e.target.value) {
              updateSearchParams(
                'from',
                formatInputDate(new Date(e.target.value)),
              )
            } else {
              deleteSearchParams('from')
            }
          }}
        />

        <div>&#8211;</div>

        <Input
          className='flex-1 w-full'
          type='date'
          value={inputTo}
          onChange={(e) => {
            if (e.target.value) {
              updateSearchParams(
                'to',
                formatInputDate(new Date(e.target.value)),
              )
            } else {
              deleteSearchParams('to')
            }
          }}
          min={inputFrom}
        />
      </div>
    </div>
  )
}
