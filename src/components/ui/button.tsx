import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'error-outline' | 'text' | 'primary-two'
  fullWidth?: boolean
  isDisabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants = {
  primary:
    'text-white bg-primary focus:bg-primary-focus hover:bg-primary-focus shadow-md',

  'primary-two':
    'text-primary font-medium bg-white focus:bg-neutral-100 hover:bg-neutral-50 border border-primary',

  'error-outline':
    'text-error-red bg-white focus:bg-red-100 hover:bg-red-50 border border-error-red',

  secondary:
    'text-black bg-secondary focus:bg-secondary-focus hover:bg-secondary-focus',

  text: 'text-black bg-white !p-0',
}

export const Button = ({
  children,
  variant = 'primary',
  isDisabled = false,
  className,
  fullWidth = true,
  ...props
}: Props) => (
  <button
    {...props}
    disabled={isDisabled}
    className={clsx(
      variants[variant],
      { 'w-full': fullWidth },
      'px-4 py-2 rounded-md',
      className,
    )}
  >
    {children}
  </button>
)
