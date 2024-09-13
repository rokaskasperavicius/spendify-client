import { Button, Loader } from '@/components/ui'

import {
  useDestroySessionMutation,
  useGetSessionsQuery,
} from '@/features/auth/auth.api'
import { authApi } from '@/features/auth/auth.api'
import { AUTH_TAGS } from '@/features/auth/auth.constants'

import { useAppDispatch } from '@/store/hooks'

export const UserSessions = () => {
  const dispatch = useAppDispatch()

  const [destroySession] = useDestroySessionMutation()

  const { data: sessions, isLoading } = useGetSessionsQuery(undefined)

  const handleDestroySession = async (sessionId: string) => {
    try {
      await destroySession({ sessionId }).unwrap()
      dispatch(authApi.util.invalidateTags([AUTH_TAGS.DEVICES]))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Loader isLoading={isLoading}>
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
    </Loader>
  )
}
