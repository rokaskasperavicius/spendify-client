// Hooks & Helpers
import { useAppDispatch } from 'store/hooks'
import {
  useGetUserDevicesQuery,
  useSignOutUserMutation,
} from 'features/auth/authApi'
import { authApi } from 'features/auth/authApi'
import { useAuthState } from 'features/auth/authSlice'

// Components
import { Button, Spinner } from 'components/ui'

export const UserDevices = () => {
  const dispatch = useAppDispatch()

  const [signOutUser] = useSignOutUserMutation()

  const { refreshToken: currentRefreshToken } = useAuthState()
  const { data: userDevices, isLoading } = useGetUserDevicesQuery()

  const handleSignOutDevice = async (refreshToken: string) => {
    try {
      await signOutUser({ refreshToken }).unwrap()
      dispatch(authApi.util.invalidateTags(['Devices']))
    } catch {}
  }

  return (
    <Spinner isLoading={isLoading} rootClassName='flex justify-center'>
      <div className='space-y-4'>
        <div className='font-medium'>Manage Account Devices</div>

        <div className='space-y-8'>
          {userDevices?.map(({ refreshToken, ipAddress, ipLocation }) => (
            <div key={refreshToken} className='space-y-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <div>{ipAddress}</div>

                  {refreshToken === currentRefreshToken && (
                    <div className='bg-primary text-white text-sm px-2 py-0.5 rounded-xl'>
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
                  onClick={() => handleSignOutDevice(refreshToken)}
                >
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Spinner>
  )
}
