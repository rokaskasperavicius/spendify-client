import clsx from 'clsx'
import { useState } from 'react'

import CloseIcon from '@/assets/close.svg'
import InfoIcon from '@/assets/info.svg'

import { Button, Dialog, Image, Input, Select } from '@/components/ui'

import { useAccountSlice } from '@/features/accounts/accounts-slice'
import {
  addAccountsInterval,
  changeAccountsInterval,
  removeAccountsInterval,
} from '@/features/accounts/accounts-slice'
import { IntervalProps } from '@/features/accounts/accounts-types'

import { useAppDispatch } from '@/store/hooks'

import { formatInputDate } from '@/utils/format-date'

import { graphColors } from './TransactionGraph/constants'

type Props = {
  isShown: boolean
  showIntervals: boolean
  search: string
  setSearch: (search: string) => void
  category: string
  setCategory: (category: string) => void
}

export const DashboardTooltip = ({
  isShown,
  showIntervals,
  search,
  setSearch,
  category,
  setCategory,
}: Props) => {
  const dispatch = useAppDispatch()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { intervals } = useAccountSlice()

  const createInterval = () => {
    dispatch(addAccountsInterval())
  }

  const handleIntervalChange = (interval: IntervalProps) => {
    dispatch(changeAccountsInterval(interval))
  }

  const deleteInterval = (id: string) => {
    dispatch(removeAccountsInterval({ id }))
  }

  const primaryInterval = intervals[0]

  return (
    <div
      className={clsx('flex gap-4 flex-col overflow-hidden transition-all', {
        'max-h-0 mb-0': !isShown,
        'max-h-[200px] mb-4': isShown,
      })}
    >
      <Input
        className='flex-1'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search for Transactions...'
      />

      <Select value={category} onChange={(e) => setCategory(e.target.value)} />

      {!showIntervals && (
        <div className='flex items-center gap-2'>
          <Input
            className='flex-1 w-full'
            type='date'
            value={
              primaryInterval.from ? formatInputDate(primaryInterval.from) : ''
            }
            max={
              primaryInterval.to
                ? formatInputDate(primaryInterval.to)
                : formatInputDate(new Date().getTime())
            }
            onChange={(e) => {
              return handleIntervalChange({
                id: primaryInterval.id,
                from: e.target.value
                  ? new Date(e.target.value).getTime()
                  : null,
                to: primaryInterval.to,
              })
            }}
          />

          <div>&#8211;</div>

          <Input
            className='flex-1 w-full'
            type='date'
            value={
              primaryInterval.to ? formatInputDate(primaryInterval.to) : ''
            }
            onChange={(e) =>
              handleIntervalChange({
                id: primaryInterval.id,
                from: primaryInterval.from,
                to: e.target.value ? new Date(e.target.value).getTime() : null,
              })
            }
            min={
              primaryInterval.from ? formatInputDate(primaryInterval.from) : ''
            }
            max={formatInputDate(new Date().getTime())}
          />
        </div>
      )}

      {showIntervals && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title='Compare Time Intervals'
          tooltipText='Here you can compare different transaction periods with additional time intervals'
          trigger={
            <Button variant='simple'>
              <div className='flex gap-2 items-center justify-center'>
                <div>Time Intervals</div>
                <Image src={InfoIcon} size='sm' alt='info icon' />
              </div>
            </Button>
          }
        >
          <div className='mt-4 space-y-4'>
            {intervals.length < 3 && (
              <Button onClick={createInterval} variant='simple'>
                Create new Interval (Max 3)
              </Button>
            )}

            {intervals.map(({ id, from, to }, index) => (
              <div key={id}>
                <div>
                  {index === 0 ? 'Primary' : index === 1 ? 'Additional' : ''}
                </div>

                <div className='flex items-center gap-2 mt-4 md:mt-2'>
                  <div
                    className='h-1 w-5 rounded-full hidden md:block'
                    style={{ backgroundColor: graphColors[index] }}
                  />

                  <div className='flex gap-4 items-stretch w-full'>
                    <div className='flex items-center gap-2 flex-1 flex-col md:flex-row'>
                      <Input
                        className='flex-1 w-full'
                        type='date'
                        value={from ? formatInputDate(from) : ''}
                        max={
                          to
                            ? formatInputDate(to)
                            : formatInputDate(new Date().getTime())
                        }
                        onChange={(e) =>
                          handleIntervalChange({
                            id,
                            from: new Date(e.target.value).getTime(),
                            to,
                          })
                        }
                      />
                      <div className='hidden md:block'>&#8211;</div>
                      <Input
                        className='flex-1 w-full'
                        type='date'
                        value={to ? formatInputDate(to) : ''}
                        onChange={(e) =>
                          handleIntervalChange({
                            id,
                            from,
                            to: new Date(e.target.value).getTime(),
                          })
                        }
                        min={from ? formatInputDate(from) : ''}
                        max={formatInputDate(new Date().getTime())}
                      />
                    </div>
                    <Button
                      variant='error-outline'
                      fullWidth={false}
                      onClick={() => deleteInterval(id)}
                      className='w-auto'
                    >
                      <Image src={CloseIcon} alt='Close Icon' size='sm' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Dialog>
      )}
    </div>
  )
}
