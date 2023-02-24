import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { MainLayout, SimpleLayout } from 'components/layouts'

import { routes as loginRoutes } from 'features/auth/routes'
import { routes as accountRoutes } from 'features/accounts/routes'

import { Login } from 'features/auth/routes/Login'
import { Register } from 'features/auth/routes/Register'

export const userRoutes = createBrowserRouter([
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
  return (
    // <HistoryRouter history={history}>
    <RouterProvider router={userRoutes} />
    // </HistoryRouter>
  )
}
