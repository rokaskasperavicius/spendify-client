import ClipLoader from 'react-spinners/ClipLoader'

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

export const Spinner = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <ClipLoader
        className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
        loading={isLoading}
        color='#163b23'
      />
    )
  }

  return <>{children}</>
}
