import { useState } from 'react'

// Assets
import CloseIcon from 'assets/close.svg'

// Components
import { Dialog, Input, Button, Image, Select } from 'components/ui'

// Hooks & Helpers
import { useAccountSlice } from 'features/account/accountSlice'
import { useAppDispatch } from 'store/hooks'
import { formatDate } from 'utils/formatDate'
import {
  addAccountsInterval,
  removeAccountsInterval,
  changeAccountsInterval,
} from 'features/account/accountSlice'

// Constants
import { graphColors } from 'features/account/components/TransactionGraph/constants'

// Types
import { IntervalProps } from 'features/account/types'

type Props = {
  showIntervals: boolean
  search: string
  setSearch: (search: string) => void
  category: string
  setCategory: (category: string) => void
}

export const DashboardIntervalDialog = ({
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
    <div className='flex gap-4 flex-col'>
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
            value={primaryInterval.from && formatDate(primaryInterval.from)}
            max={primaryInterval.to && formatDate(primaryInterval.to)}
            onChange={(e) =>
              handleIntervalChange({
                id: primaryInterval.id,
                from: new Date(e.target.value).getTime(),
                to: primaryInterval.to,
              })
            }
          />

          <div>&#8211;</div>

          <Input
            className='flex-1 w-full'
            type='date'
            value={primaryInterval.to && formatDate(primaryInterval.to)}
            onChange={(e) =>
              handleIntervalChange({
                id: primaryInterval.id,
                from: primaryInterval.from,
                to: new Date(e.target.value).getTime(),
              })
            }
            max={formatDate(new Date().getTime())}
          />
        </div>
      )}

      {showIntervals && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title='Manage Time Intervals'
          trigger={
            <Button variant='simple' fullWidth={false}>
              Intervals
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
                        value={from && formatDate(from)}
                        max={to && formatDate(to)}
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
                        value={to && formatDate(to)}
                        onChange={(e) =>
                          handleIntervalChange({
                            id,
                            from,
                            to: new Date(e.target.value).getTime(),
                          })
                        }
                        max={formatDate(new Date().getTime())}
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
