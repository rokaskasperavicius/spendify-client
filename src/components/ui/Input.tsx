import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }: Props, ref) => (
    <input
      ref={ref}
      {...props}
      className={clsx(
        'px-4 py-2 border border-gray-400 rounded-md shadow-sm',
        className,
      )}
    />
  ),
)
