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
import { useSignOutUserMutation } from 'features/auth/authApi'
import { useAuthState } from 'features/auth/authSlice'
import { useScrollDirection } from 'hooks/useScrollDirection'

// Components
import { Image, Button } from 'components/ui'
import { Menu } from 'components/Menu'
import clsx from 'clsx'
import { useState } from 'react'

export const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [signOutUser] = useSignOutUserMutation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { accessToken, refreshToken } = useAuthState()

  const scrollDirection = useScrollDirection()

  const handleSignOut = async () => {
    await signOutUser({ refreshToken: refreshToken || '' })
  }

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className='min-h-screen flex flex-col first-letter bg-background'>
      <div
        className={`items-center p-4 font-medium w-full flex justify-between sticky top-0 bg-background border-b border-gray-300 z-30 ${
          scrollDirection === 'down' ? '!-top-[60px]' : 'top-0'
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

      <Outlet />

      <footer className='p-4 border-t border-gray-300 md:text-base text-sm'>
        &copy; 2023 Spendify. All Rights Reserved.
      </footer>
    </div>
  )
}
