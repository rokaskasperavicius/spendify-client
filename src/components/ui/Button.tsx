import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants = {
  primary:
    'text-white bg-primary focus:bg-primary-focus hover:bg-primary-focus',
  secondary:
    'text-black bg-secondary focus:bg-secondary-focus hover:bg-secondary-focus',
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: Props) => (
  <button
    {...props}
    className={clsx(
      variants[variant],
      'px-4 py-2 rounded-md w-full shadow-md',
      className
    )}
  >
    {children}
  </button>
)
