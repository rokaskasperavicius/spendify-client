import { useWindowSize } from 'react-use'

import SwitchAccount from '@/assets/switch-account.svg'

import { Breakpoints } from '@/config/constants'

import { Dialog, Image } from '@/components/ui'

import { Account } from '@/features/accounts/accounts.types'

import { ConnectedAccounts } from './connected-accounts'

type Props = {
  account: Account | undefined
  accounts: Account[] | undefined
  isLoading: boolean
  handleCTA: () => void
  handleAccountChange: (accountId: string) => void
}

export const ConnectedAccountBanner = ({
  account,
  accounts,
  isLoading,
  handleAccountChange,
  handleCTA,
}: Props) => {
  const windowWidth = useWindowSize().width
  if (!account) return null

  return (
    <div>
      <div className='flex md:flex-row flex-col items-start text-lg md:items-center justify-between font-medium'>
        <div className='flex items-center gap-2'>
          <span>{account.name}</span>

          {windowWidth < Breakpoints.lg && (
            <Dialog
              title='Your Accounts'
              trigger={
                <div className='cursor-pointer'>
                  <Image
                    size='md'
                    src={SwitchAccount}
                    rounded={false}
                    alt='switch account'
                  />
                </div>
              }
            >
              <ConnectedAccounts
                accounts={accounts}
                isLoading={isLoading}
                handleAccountChange={handleAccountChange}
                handleCTA={handleCTA}
              />
            </Dialog>
          )}
        </div>
        <div>{account.balance} DKK</div>
      </div>

      <div className='text-gray-500 mt-1'>{account.iban}</div>
    </div>
  )
}
