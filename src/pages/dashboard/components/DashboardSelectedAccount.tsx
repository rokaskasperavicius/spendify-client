import { useWindowSize } from 'react-use'

import { Dialog } from '@/components/ui'

import { LinkedAccount } from '@/features/account/types'

import { Breakpoints } from '@/lib/constants'

import { DashboardAccountList } from './DashboardAccountList'

type Props = {
  selectedAccount: LinkedAccount
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const DashboardSelectedAccount = ({
  selectedAccount,
  handleAccountChange,
  handleCTA,
}: Props) => (
  <div>
    <div className='flex md:flex-row flex-col items-start text-lg md:items-center justify-between font-medium'>
      <div className='space-x-1'>
        <span>{selectedAccount.accountName}</span>
        {useWindowSize().width < Breakpoints.lg && (
          <Dialog
            title='Your Accounts'
            trigger={
              <span className='font-normal'>
                (<span className='hover:underline cursor-pointer'>Switch</span>)
              </span>
            }
          >
            <DashboardAccountList
              handleAccountChange={handleAccountChange}
              handleCTA={handleCTA}
            />
          </Dialog>
        )}
      </div>
      <div>{selectedAccount.accountBalance} DKK</div>
    </div>
    <div className='text-gray-500 mt-1'>{selectedAccount.accountIban}</div>
  </div>
)
