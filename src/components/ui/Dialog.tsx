import clsx from 'clsx'
import * as RadixDialog from '@radix-ui/react-dialog'

// Assets
import CloseIcon from 'assets/close.svg'

// Components
import { Image } from 'components/ui'

type Props = {
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  title: string
  children: React.ReactNode
  trigger: React.ReactNode
  mode?: 'drawer' | 'modal'
  closeIconSize?: 'sm' | 'mdd'
}

const variants = {
  drawer: 'w-full h-full fixed top-0 right-0',

  modal:
    'rounded-md w-11/12 max-w-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export const Dialog = ({
  title,
  children,
  trigger,
  mode = 'modal',
  closeIconSize = 'sm',
}: Props) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>

    <RadixDialog.Portal>
      <RadixDialog.Overlay className='bg-black opacity-30 inset-0 fixed z-50' />
      <RadixDialog.Content
        className={clsx('p-4 bg-white z-50', variants[mode])}
      >
        <RadixDialog.Title className='font-primary'>{title}</RadixDialog.Title>

        <div className='mt-4'>{children}</div>

        <RadixDialog.Close className='absolute top-3 right-3'>
          <Image src={CloseIcon} alt='Close Icon' size={closeIconSize} />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)
