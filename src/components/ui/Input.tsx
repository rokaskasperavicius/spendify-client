import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...props }: Props) => (
  <input
    {...props}
    className='px-4 py-2 border border-gray-400 rounded-md shadow-sm'
  />
)
