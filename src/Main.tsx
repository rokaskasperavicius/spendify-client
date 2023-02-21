import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Layout } from 'Layout'

import { routes as loginRoutes } from 'features/auth/routes'
import { routes as accountRoutes } from 'features/accounts/routes'

import { Login } from 'features/auth/routes/Login'

const userRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    element: <Login />,
  },
])

export const Main = () => {
  return (
    <div className='h-screen'>
      <RouterProvider router={userRoutes} />
    </div>
  )
}
