import 'react-toastify/dist/ReactToastify.css'

import '@/styles/index.css'

import { AppProviders } from './providers'
import { AppRouter } from './router'

export const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
