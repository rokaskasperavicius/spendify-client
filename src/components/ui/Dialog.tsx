import * as RadixDialog from '@radix-ui/react-dialog'
import { format } from 'date-fns'

// Assets
import CloseIcon from 'assets/close.svg'

// Helpers & Hooks
import {
  useAccountsSlice,
  addAccountsInterval,
  removeAccountsInterval,
  changeAccountsInterval,
} from 'features/account/accountsSlice'
import { useAppDispatch } from 'store/hooks'

// Components
import { Image } from 'components/ui'

export const Dialog = () => {
  const { intervals } = useAccountsSlice()
  const dispatch = useAppDispatch()

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>
        <button>+</button>
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='bg-black opacity-30 inset-0 fixed z-50' />
        <RadixDialog.Content className='p-4 bg-white rounded-xl w-11/12 max-w-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <RadixDialog.Title className='font-primary'>
            Insert / Edit Time Intervals
          </RadixDialog.Title>
          <div className='mt-4 space-y-4'>
            <button onClick={() => dispatch(addAccountsInterval())}>
              Add Interval
            </button>

            {intervals.map((interval) => (
              <div key={interval.id} className='flex gap-4'>
                <div>
                  <div>From:</div>
                  <input
                    type='date'
                    className='border border-gray-500'
                    value={
                      interval.from
                        ? format(new Date(interval.from), 'yyyy-MM-dd')
                        : ''
                    }
                    onChange={(e) =>
                      dispatch(
                        changeAccountsInterval({
                          ...interval,
                          from: new Date(e.target.value).getTime(),
                        })
                      )
                    }
                    max={
                      interval.to
                        ? format(new Date(interval.to), 'yyyy-MM-dd')
                        : ''
                    }
                  />
                </div>

                <div>
                  <div>To:</div>
                  <div className='flex items-center gap-2'>
                    <input
                      type='date'
                      className='border border-gray-500'
                      value={
                        interval.to
                          ? format(new Date(interval.to), 'yyyy-MM-dd')
                          : ''
                      }
                      onChange={(e) =>
                        dispatch(
                          changeAccountsInterval({
                            ...interval,
                            to: new Date(e.target.value).getTime(),
                          })
                        )
                      }
                      min={
                        interval.from
                          ? format(new Date(interval.from), 'yyyy-MM-dd')
                          : ''
                      }
                    />
                    <button
                      onClick={() =>
                        dispatch(removeAccountsInterval({ id: interval.id }))
                      }
                    >
                      <Image src={CloseIcon} alt='Close Icon' size='sm' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <RadixDialog.Close className='absolute top-3 right-3'>
            <Image src={CloseIcon} alt='Close Icon' size='sm' />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
