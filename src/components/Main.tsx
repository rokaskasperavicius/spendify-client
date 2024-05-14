import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { MainLayout, SimpleLayout } from '@/components/layouts'

import { Dashboard } from '@/pages/dashboard'
import { ConnectAccount, Settings } from '@/pages/index'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'

export const userRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
    element: <SimpleLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  {
    path: '/register',
    element: <SimpleLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
])

export const Main = () => <RouterProvider router={userRoutes} />
