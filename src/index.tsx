import 'styles/tailwindCSS.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'

import 'styles/index.css'
import { Main } from 'components'
import reportWebVitals from './reportWebVitals'
import { ToastContainer } from 'react-toastify'

import { store, persistor } from 'store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const MainProjectInstance = () => (
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
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* <MainProjectInstance /> */}

    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
      <div className='font-bold text-2xl'>The Project Has Been Disabled</div>
      <div className='flex gap-2 text-xl'>
        Contact the System Administrator:
        <a
          href='mailto:goodname258@gmail.com'
          className='cursor-pointer italic'
        >
          goodname258@gmail.com
        </a>
      </div>
    </div>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
