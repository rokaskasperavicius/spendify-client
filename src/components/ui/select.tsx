import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }: Props, ref) => (
    <select
      ref={ref}
      {...props}
      className={clsx(
        'px-4 py-2.5 border border-gray-400 rounded-md shadow-sm',
        className,
      )}
    >
      <option value=''>Choose a Category</option>
      <option value='Food & Groceries'>Food & Groceries</option>
      <option value='Utilities'>Utilities</option>
      <option value='Transfers'>Transfers</option>
    </select>
  ),
)
