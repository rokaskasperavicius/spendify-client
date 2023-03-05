import BounceLoader from 'react-spinners/BounceLoader'

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

export const Spinner = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        <BounceLoader loading={isLoading} color='#163b23' />
      </div>
    )
  }

  return <>{children}</>
}
