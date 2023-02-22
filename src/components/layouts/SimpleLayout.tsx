import { Outlet } from 'react-router-dom'

export const SimpleLayout = () => (
  <div className='h-screen flex flex-col'>
    <div className='p-6 text-white text-2xl font-medium w-full bg-primary'>
      Spendify
    </div>

    <main className='flex-1'>
      <Outlet />
    </main>

    <footer className='bg-primary text-white p-6'>
      &copy; 2023 Spendify. All Rights Reserved.
    </footer>
  </div>
)
