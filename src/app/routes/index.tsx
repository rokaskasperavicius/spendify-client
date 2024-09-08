import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layouts/app-layout'
import { UnAuthenticatedLayout } from '@/components/layouts/unauthenticated-layout'

import { ConnectAccount } from './connect-account/connect-account'
import { Dashboard } from './dashboard/dashboard'
import { Login } from './login/login'
import { Register } from './register/register'
import { Settings } from './settings/settings'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/link-account',
        element: <ConnectAccount />,
      },

      {
        path: '/settings',
        element: <Settings />,
      },

      {
        path: '*',
        element: <Navigate to='/' />,
      },
    ],
  },

  {
    path: '/login',
    element: <UnAuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  {
    path: '/register',
    element: <UnAuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
])
