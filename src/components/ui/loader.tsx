import clsx from 'clsx'

type Props = {
  isLoading: boolean
  children?: React.ReactNode
  text?: string
  rootClassName?: string
}

/**
 * Renders a loader component that displays a loading animation when `isLoading` is true.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - Determines whether the loader should be displayed or not.
 * @param {string} props.text - The text to be displayed when `isLoading` is true.
 * @param {ReactNode} props.children - The content to be rendered when `isLoading` is false.
 * @param {string} props.rootClassName - The CSS class name for the root element of the loader.
 * @returns {ReactNode} The loader component.
 */
export const Loader = ({ isLoading, text, children, rootClassName }: Props) => {
  if (isLoading) {
    return (
      <div
        className={clsx(
          'flex justify-center items-center flex-col',
          rootClassName,
        )}
      >
        {isLoading && <span className='loader' />}

        {text && <p className='text-center mt-4'>{text}</p>}
      </div>
    )
  }

  return <>{children}</>
}
