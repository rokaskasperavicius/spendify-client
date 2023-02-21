import { Outlet, Link, Navigate } from 'react-router-dom'

import { useAppDispatch } from 'hooks'
import { signOut, useAuthState } from 'features/auth/slice'

export const Layout = () => {
  const { accessToken } = useAuthState()
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      <div className='mb-10 bg-red-300 flex justify-between p-4'>
        <ul className='flex gap-4'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/'>Accounts</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>

        <button className='underline' onClick={handleSignOut}>
          Sign out
        </button>
      </div>

      <Outlet />
    </div>
  )
}
