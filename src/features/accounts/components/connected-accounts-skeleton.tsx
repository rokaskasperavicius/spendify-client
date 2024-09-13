export const ConnectedAccountsSkeleton = () => (
  <div>
    <div className='flex gap-4 items-center'>
      <div className='w-16 h-16 bg-gray-200 animate-pulse rounded-md' />

      <div className='flex-1 animate-pulse'>
        <div className='h-2 bg-gray-200 rounded-full w-2/3' />
        <div className='h-2 bg-gray-200 rounded-full mt-1' />
      </div>
    </div>
    <span className='sr-only'>Loading...</span>
  </div>
)
