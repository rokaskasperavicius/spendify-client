import clsx from 'clsx'

type Props = {
  size: 'sm' | 'smm' | 'md' | 'mdd' | 'lg'
  className?: string
  src: string
  alt: string
}

const sizes = {
  sm: 'w-4 h-4',
  smm: 'w-6 h-6',
  mdd: 'w-8 h-8',
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
