import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

// Hooks & Helpers
import {
  useGetUserDevicesQuery,
  useSignOutUserMutation,
} from 'features/auth/authApi'
import { useTitle } from 'hooks/useTitle'

// Components
import {
  ChangeAccountInformation,
  ChangeUserPassword,
} from 'components/pages/Settings'
import { Button, Image, Container } from 'components/ui'
import { useAuthState } from 'features/auth/authSlice'
import {
  useGetAccountsQuery,
  useDeleteAccountMutation,
} from 'features/account/accountApi'

export const Settings = () => {
  useTitle('Settings')

  const [deleteAccount] = useDeleteAccountMutation()
  const { data: linkedAccounts } = useGetAccountsQuery()

  const [signOutUser] = useSignOutUserMutation()
  const { data: userDevices } = useGetUserDevicesQuery()

  const { name, refreshToken: currentRefreshToken } = useAuthState()

  const [settingsPanel, setSettingsPanel] = useState<
    'profile' | 'accounts' | 'devices'
  >('profile')

  return (
    <main className='flex-1'>
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

          {linkedAccounts && linkedAccounts.length > 0 && (
            <div
              className={clsx('hover:underline cursor-pointer', {
                'font-medium': settingsPanel === 'accounts',
              })}
              onClick={() => setSettingsPanel('accounts')}
            >
              Accounts
            </div>
          )}

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
          className='space-y-8 py-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChangeAccountInformation />

          <Container className='border-t border-gray-300' />

          <ChangeUserPassword />
        </motion.div>
      )}

      {settingsPanel === 'accounts' && (
        <Container className='py-8'>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='font-medium'>Manage Connected Accounts</div>

            <div className='space-y-8'>
              {linkedAccounts?.map(
                ({ id, accountId, accountName, bankLogo, accountIban }) => (
                  <div key={id} className='flex gap-4'>
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
                  </div>
                )
              )}
            </div>
          </motion.div>
        </Container>
      )}

      {settingsPanel === 'devices' && (
        <Container className='py-8'>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='font-medium'>Manage Account Devices</div>

            <div className='space-y-8'>
              {userDevices?.map(({ refreshToken, ipAddress, ipLocation }) => (
                <div key={refreshToken} className='space-y-4'>
                  <div>
                    <div className='flex items-center gap-4'>
                      <div>{ipAddress}</div>

                      {refreshToken === currentRefreshToken && (
                        <div className='bg-primary text-white px-2 rounded-xl'>
                          Current Device
                        </div>
                      )}
                    </div>
                    <div className='text-gray-500 text-sm mt-1 truncate'>
                      {ipLocation}
                    </div>
                  </div>

                  {refreshToken !== currentRefreshToken && (
                    <Button
                      className='mt-2'
                      variant='error-outline'
                      fullWidth={false}
                      onClick={() => signOutUser({ refreshToken })}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      )}
    </main>
  )
}
