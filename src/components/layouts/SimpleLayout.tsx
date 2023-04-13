import { Outlet } from 'react-router-dom'

export const SimpleLayout = () => (
  <div className='h-screen flex flex-col bg-primary'>
    <div className='p-6 text-white text-2xl font-medium w-full'>Spendify</div>

    <main className='flex-1'>
      <Outlet />
    </main>

    <footer className='text-white p-6'>
      &copy; 2023 Spendify. All Rights Reserved.
    </footer>
  </div>
)
