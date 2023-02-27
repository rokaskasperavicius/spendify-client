import { Outlet, Navigate } from 'react-router-dom'

import { useAppDispatch } from 'store/hooks'
import { signUserOut, useAuthState } from 'features/auth/authSlice'

import { useScrollDirection } from 'hooks/useScrollDirection'

export const MainLayout = () => {
  const { accessToken, firstName, lastName } = useAuthState()
  const dispatch = useAppDispatch()

  const scrollDirection = useScrollDirection()

  const handleSignOut = () => {
    dispatch(signUserOut())
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className='h-screen flex flex-col first-letter bg-[#fffdfc]'>
      <div
        className={`min-h-[60px] items-center px-4 text-xl font-medium w-full flex justify-between sticky top-0 bg-[#fffdfc] border-b border-gray-300 z-50 ${
          scrollDirection === 'down' ? '!-top-[60px]' : 'top-0'
        } transition-all duration-500`}
      >
        <div className='font-medium text-primary'>Spendify</div>
        <div className='text-base'>
          {firstName} {lastName} (
          <button className='hover:underline' onClick={handleSignOut}>
            Sign out
          </button>
          )
        </div>
      </div>

      <main className='flex-1'>
        <Outlet />
      </main>

      <footer className='p-4 border-t border-gray-300'>
        &copy; 2023 Spendify. All Rights Reserved.
      </footer>
    </div>
  )
}
