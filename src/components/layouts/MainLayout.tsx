import { Outlet, Navigate } from 'react-router-dom'

import { useAppDispatch } from 'hooks'
import { signOut, useAuthState } from 'features/auth/slice'

export const MainLayout = () => {
  const { accessToken } = useAuthState()
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className='h-screen flex flex-col first-letter bg-[#fffdfc]'>
      <div className='p-4 text-xl font-medium w-full flex justify-between'>
        <div className='font-medium text-primary'>Spendify</div>
        <button
          className='underline color-white text-base'
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      <main className='flex-1'>
        <Outlet />
      </main>

      <footer className='p-4'>
        &copy; 2023 Spendify. All Rights Reserved.
      </footer>
    </div>
  )
}
