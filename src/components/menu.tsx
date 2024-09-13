import * as RadixDialog from '@radix-ui/react-dialog'

import CloseIcon from '@/assets/close.svg'

import { Image } from '@/components/ui'

type Props = {
  children: React.ReactNode
  trigger: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const Menu = ({ children, trigger, isOpen, setIsOpen }: Props) => (
  <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
    <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>

    <RadixDialog.Portal>
      <RadixDialog.Overlay className='bg-black opacity-30 inset-0 fixed z-50' />
      <RadixDialog.Content className='p-4 bg-white z-50 w-full h-full fixed top-0 right-0 outline-none'>
        <RadixDialog.Title className='font-medium text-primary mt-0.5 text-xl !font-primary'>
          Spendify
        </RadixDialog.Title>

        <div className='mt-4'>{children}</div>

        <RadixDialog.Close className='absolute top-4 right-4'>
          <Image src={CloseIcon} alt='Close Icon' size='lg' />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)
