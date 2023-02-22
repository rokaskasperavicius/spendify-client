import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { MainLayout, SimpleLayout } from 'components/layouts'

import { routes as loginRoutes } from 'features/auth/routes'
import { routes as accountRoutes } from 'features/accounts/routes'

import { Login } from 'features/auth/routes/Login'
import { Register } from 'features/auth/routes/Register'

const userRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...accountRoutes,
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

export const Main = () => {
  return <RouterProvider router={userRoutes} />
}
