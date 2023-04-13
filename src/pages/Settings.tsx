import { useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

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
  const [deleteAccount] = useDeleteAccountMutation()
  const { data: linkedAccounts } = useGetAccountsQuery()

  const { name } = useAuthState()

  const [settingsPanel, setSettingsPanel] = useState<'profile' | 'accounts'>(
    'profile'
  )

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
        </Container>
      </div>

      {settingsPanel === 'profile' && (
        <div className='space-y-8 py-8'>
          <ChangeAccountInformation />

          <Container className='border-t border-gray-300' />

          <ChangeUserPassword />
        </div>
      )}

      {settingsPanel === 'accounts' && (
        <Container className='space-y-8 py-8'>
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
        </Container>
      )}
    </div>
  )
}
