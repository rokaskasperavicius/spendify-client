import {
  Outlet,
  Navigate,
  useNavigate,
  Link,
  useLocation,
} from 'react-router-dom'

// Assets
import MenuIcon from 'assets/menu.svg'

// Hooks & Helpers
import { useAppDispatch } from 'store/hooks'
import { useSignOutUserMutation } from 'features/auth/authApi'
import { useAuthState, resetStore } from 'features/auth/authSlice'
import { useScrollDirection } from 'hooks/useScrollDirection'

// Components
import { Image, Button } from 'components/ui'
import { Menu } from 'components/Menu'
import clsx from 'clsx'
import { useState } from 'react'

export const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [signOutUser] = useSignOutUserMutation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { accessToken, refreshToken } = useAuthState()

  const scrollDirection = useScrollDirection()

  const handleSignOut = async () => {
    try {
      await signOutUser({ refreshToken: refreshToken || '' }).unwrap()
      dispatch(resetStore())
    } catch {}
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <div
        className={`items-center h-14 px-4 font-medium w-full flex justify-between sticky border-b border-gray-300 z-30 ${
          scrollDirection === 'down' ? '-top-14' : 'top-0'
        } transition-all duration-500`}
      >
        <Link to='/' className='font-medium text-primary text-xl'>
          Spendify
        </Link>

        <div className='md:hidden'>
          <Menu
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            trigger={
              <div>
                <Image alt='Menu Icon' size='mdd' src={MenuIcon} />
              </div>
            }
          >
            <div className='flex flex-col gap-4'>
              <Link
                to='/'
                className={clsx('text-lg font-medium mt-8', {
                  underline: location.pathname === '/',
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to='/settings'
                className={clsx('text-lg font-medium', {
                  underline: location.pathname === '/settings',
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>

              <Button
                variant='text'
                className='text-lg text-left mt-2'
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </Menu>
        </div>

        <div className='text-base hidden md:flex gap-4'>
          <Button
            fullWidth={false}
            variant='text'
            className='hover:underline'
            onClick={() => navigate('/settings')}
          >
            Settings
          </Button>
          <Button
            fullWidth={false}
            variant='text'
            className='hover:underline'
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </div>

      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>

      <footer className='h-14 flex px-4 items-center border-t border-gray-300 md:text-base text-sm'>
        &copy; 2023 Spendify. All Rights Reserved.
      </footer>
    </div>
  )
}
