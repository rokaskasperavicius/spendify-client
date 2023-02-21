import { ButtonHTMLAttributes } from 'react'

type Props = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className='px-4 py-2 bg-lime-400 hover:bg-lime-500 rounded-md w-full shadow-md'
  >
    {children}
  </button>
)
