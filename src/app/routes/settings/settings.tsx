import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Button, Container, Image } from '@/components/ui'

import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from '@/features/accounts/accounts-api'
import { useAuthState } from '@/features/auth/auth-slice'

import { useTitle } from '@/hooks/use-title'

import { ChangeUserAccountInformation } from './components/change-user-account-information'
import { ChangeUserPassword } from './components/change-user-password'
import { UserSessions } from './components/user-sessions'

export const Settings = () => {
  useTitle('Settings')

  const [deleteAccount] = useDeleteAccountMutation()
  const { data } = useGetAccountsQuery(undefined)

  const { name } = useAuthState()

  const [settingsPanel, setSettingsPanel] = useState<
    'profile' | 'accounts' | 'sessions'
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
              'font-medium': settingsPanel === 'sessions',
            })}
            onClick={() => setSettingsPanel('sessions')}
          >
            Sessions
          </div>
        </Container>
      </div>

      {settingsPanel === 'profile' && (
        <motion.div
          className='space-y-8 py-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChangeUserAccountInformation />

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
              {data && data.accounts.length > 0 ? (
                data.accounts?.map(({ id, name, institutionLogo, iban }) => (
                  <li key={id} className='flex gap-4'>
                    {institutionLogo && (
                      <div>
                        <Image
                          size='md'
                          src={institutionLogo}
                          alt='Bank Logo'
                        />
                      </div>
                    )}

                    <div className='overflow-hidden'>
                      <div className='truncate'>{name}</div>
                      <div className='text-gray-500 text-sm mt-1 truncate'>
                        {iban}
                      </div>

                      <Button
                        className='mt-2'
                        variant='error-outline'
                        fullWidth={false}
                        onClick={() => deleteAccount({ accountId: id })}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <div>No Accounts Found</div>
              )}
            </ul>
          </motion.div>
        </Container>
      )}

      {settingsPanel === 'sessions' && (
        <Container className='py-4 relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UserSessions />
          </motion.div>
        </Container>
      )}
    </div>
  )
}
