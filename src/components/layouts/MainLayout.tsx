import { Outlet, Navigate } from 'react-router-dom'

import { useAppDispatch } from 'store/hooks'
import { signUserOut, useAuthState } from 'features/auth/authSlice'

export const MainLayout = () => {
  const { accessToken, firstName, lastName } = useAuthState()
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signUserOut())
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className='h-screen flex flex-col first-letter bg-[#fffdfc]'>
      <div className='p-4 text-xl font-medium w-full flex justify-between'>
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

      <footer className='p-4'>
        &copy; 2023 Spendify. All Rights Reserved.
      </footer>
    </div>
  )
}
