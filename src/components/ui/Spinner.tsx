import ClipLoader from 'react-spinners/ClipLoader'

type Props = {
  isLoading: boolean
  children?: React.ReactNode
  rootClassName?: string
}

export const Spinner = ({ isLoading, children, rootClassName }: Props) => {
  if (isLoading) {
    return (
      <div className={rootClassName}>
        <ClipLoader loading={isLoading} color='#163b23' />
      </div>
    )
  }

  return <>{children}</>
}
