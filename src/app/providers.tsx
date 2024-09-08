import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/index'

type Props = {
  children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          hideProgressBar={true}
          autoClose={3000}
          position='bottom-right'
        />

        {children}
      </PersistGate>
    </Provider>
  )
}
