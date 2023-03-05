import clsx from 'clsx'

type Props = {
  size: 'sm' | 'md' | 'lg'
  className?: string
  src: string
  alt: string
}

const sizes = {
  sm: '',
  md: 'w-16 h-16',
  lg: '',
}

export const Image = ({ size, src, className, alt }: Props) => (
  <div className={sizes[size]}>
    <img
      src={src}
      alt={alt}
      className={clsx(sizes[size], 'object-cover rounded-md', className)}
    />
  </div>
)
