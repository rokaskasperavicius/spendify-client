import clsx from 'clsx'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => (
  <div className={clsx('md:max-w-3xl mx-auto w-full px-4 md:px-0', className)}>
    {children}
  </div>
)
