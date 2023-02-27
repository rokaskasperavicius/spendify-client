import './tailwindCSS.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-day-picker/dist/style.css'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import { Main } from 'components/Main'
import reportWebVitals from './reportWebVitals'
import { ToastContainer } from 'react-toastify'

import { store, persistor } from 'store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          hideProgressBar={true}
          autoClose={3000}
          position='bottom-right'
        />
        <Main />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
