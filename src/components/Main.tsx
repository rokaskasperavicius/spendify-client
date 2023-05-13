import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

// Components
import { MainLayout, SimpleLayout } from 'components/layouts'

// Pages
import { Login } from 'pages/login'
import { Register } from 'pages/register'
import { Dashboard } from 'pages/dashboard'
import { Settings, ConnectAccount } from 'pages'

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
