import { ButtonHTMLAttributes } from 'react'

type Props = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: Props) => (
  <button
    {...props}
    className='px-4 py-3 rounded-md w-full shadow-md text-black bg-secondary focus:bg-[#d3d248] hover:bg-[#d3d248]'
  >
    {children}
  </button>
)
