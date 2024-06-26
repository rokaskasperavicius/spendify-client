import { Button, Spinner } from '@/components/ui'

import {
  useDestroySessionMutation,
  useGetSessionsQuery,
} from '@/features/auth/authApi'
import { authApi } from '@/features/auth/authApi'

import { useAppDispatch } from '@/store/hooks'

export const UserSessions = () => {
  const dispatch = useAppDispatch()

  const [destroySession] = useDestroySessionMutation()

  const { data: sessions, isLoading } = useGetSessionsQuery()

  const handleDestroySession = async (sessionId: string) => {
    try {
      await destroySession({ sessionId }).unwrap()
      dispatch(authApi.util.invalidateTags(['Devices']))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Spinner isLoading={isLoading} rootClassName='flex justify-center'>
      <div className='space-y-4'>
        <div className='font-medium'>Manage Account Sessions</div>

        <div className='space-y-8'>
          {sessions?.map(({ sessionId, ipAddress, ipLocation, isCurrent }) => (
            <div key={sessionId} className='space-y-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <div>{ipAddress}</div>

                  {isCurrent && (
                    <div className='bg-primary text-white text-sm px-2 py-0.5 rounded-xl'>
                      Current Device
                    </div>
                  )}
                </div>
                <div className='text-gray-500 text-sm mt-1 truncate'>
                  {ipLocation}
                </div>
              </div>

              {!isCurrent && (
                <Button
                  className='mt-2'
                  variant='error-outline'
                  fullWidth={false}
                  onClick={() => handleDestroySession(sessionId)}
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
