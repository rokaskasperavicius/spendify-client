import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

import { Main } from '@/components/index'

import { persistor, store } from '@/store/index'

import './styles/index.css'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProjectInstance />

    {/* <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
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
    </div> */}
  </React.StrictMode>,
)
