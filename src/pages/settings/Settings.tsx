import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

// Hooks & Helpers
import { useTitle } from 'hooks/useTitle'
import { useAuthState } from 'features/auth/authSlice'
import {
  useGetAccountsQuery,
  useDeleteAccountMutation,
} from 'features/account/accountApi'
import { useGetUserDevicesQuery } from 'features/auth/authApi'

// Components
import {
  ChangeAccountInformation,
  ChangeUserPassword,
  UserDevices,
} from './components'
import { Button, Image, Container } from 'components/ui'

export const Settings = () => {
  useTitle('Settings')

  const [deleteAccount] = useDeleteAccountMutation()
  const { data: linkedAccounts } = useGetAccountsQuery()
  const { data } = useGetUserDevicesQuery()

  const { name } = useAuthState()

  const [settingsPanel, setSettingsPanel] = useState<
    'profile' | 'accounts' | 'devices'
  >('profile')

  return (
    <div>
      <div className='py-4 border-b border-gray-300 space-y-4'>
        <Container className='flex justify-between items-center'>
          <div className='text-lg'>Settings</div>
          <div>{name}</div>
        </Container>

        <Container className='flex gap-6'>
          <div
            className={clsx('hover:underline cursor-pointer', {
              'font-medium': settingsPanel === 'profile',
            })}
            onClick={() => setSettingsPanel('profile')}
          >
            Profile
          </div>

          <div
            className={clsx('hover:underline cursor-pointer', {
              'font-medium': settingsPanel === 'accounts',
            })}
            onClick={() => setSettingsPanel('accounts')}
          >
            Accounts
          </div>
          <div
            className={clsx('hover:underline cursor-pointer', {
              'font-medium': settingsPanel === 'devices',
            })}
            onClick={() => setSettingsPanel('devices')}
          >
            Devices
          </div>
        </Container>
      </div>

      {settingsPanel === 'profile' && (
        <motion.div
          className='space-y-8 py-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChangeAccountInformation />

          <Container className='border-t border-gray-300' />

          <ChangeUserPassword />
        </motion.div>
      )}

      {settingsPanel === 'accounts' && (
        <Container className='py-4'>
          <motion.div
            className='space-y-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='font-medium'>Manage Connected Accounts</div>

            <ul className='space-y-8'>
              {linkedAccounts && linkedAccounts.length > 0 ? (
                linkedAccounts?.map(
                  ({ id, accountId, accountName, bankLogo, accountIban }) => (
                    <li key={id} className='flex gap-4'>
                      <div>
                        <Image size='md' src={bankLogo} alt='Bank Logo' />
                      </div>

                      <div className='overflow-hidden'>
                        <div className='truncate'>{accountName}</div>
                        <div className='text-gray-500 text-sm mt-1 truncate'>
                          {accountIban}
                        </div>

                        <Button
                          className='mt-2'
                          variant='error-outline'
                          fullWidth={false}
                          onClick={() => deleteAccount({ accountId })}
                        >
                          Remove
                        </Button>
                      </div>
                    </li>
                  )
                )
              ) : (
                <div>No Accounts Found</div>
              )}
            </ul>
          </motion.div>
        </Container>
      )}

      {settingsPanel === 'devices' && (
        <Container className='py-4 relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UserDevices />
          </motion.div>
        </Container>
      )}
    </div>
  )
}
