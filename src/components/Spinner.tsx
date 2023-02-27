import BounceLoader from 'react-spinners/BounceLoader'

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

export const Spinner = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div className='h-full flex justify-center items-center'>
        <BounceLoader loading={isLoading} color='#163b23' />
      </div>
    )
  }

  return <>{children}</>
}
