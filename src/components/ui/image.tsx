import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

type ImageBaseProps = VariantProps<typeof image>
const image = cva(['object-cover'], {
  variants: {
    size: {
      sm: ['w-4', 'h-4'],
      md: ['w-6', 'h-6'],
      lg: ['w-8', 'h-8'],
      xl: ['w-16', 'h-16'],
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

type Props = {
  rounded?: boolean
} & ImageBaseProps &
  Omit<React.HTMLProps<HTMLImageElement>, 'size'>

export const Image = ({ size, rounded = true, src, className, alt }: Props) => (
  <div className={image({ size, className })}>
    <img
      src={src}
      alt={alt}
      className={clsx('w-full h-full object-cover', { 'rounded-md': rounded })}
    />
  </div>
)
