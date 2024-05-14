import * as RadixDialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { useState } from 'react'

import CloseIcon from '@/assets/close.svg'

import { Image } from '@/components/ui'

type Props = {
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  title: string
  children: React.ReactNode
  trigger: React.ReactNode
  mode?: 'modal'
  closeIconSize?: 'sm' | 'mdd'
  tooltipText?: string
}

const variants = {
  modal:
    'rounded-md w-11/12 max-w-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export const Dialog = ({
  title,
  children,
  trigger,
  mode = 'modal',
  closeIconSize = 'sm',
  tooltipText,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <RadixDialog.Trigger asChild>
        {tooltipText ? (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger onClick={() => setIsOpen(true)}>
                {trigger}
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className='bg-white p-2 shadow-md rounded-lg'>
                  {tooltipText}
                  <Tooltip.Arrow className='fill-white' />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ) : (
          trigger
        )}
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className='bg-black opacity-30 inset-0 fixed z-50' />
        <RadixDialog.Content
          className={clsx('p-4 bg-white z-50', variants[mode])}
        >
          <RadixDialog.Title className='font-primary'>
            {title}
          </RadixDialog.Title>

          <div className='mt-4'>{children}</div>

          <RadixDialog.Close className='absolute top-3 right-3'>
            <Image src={CloseIcon} alt='Close Icon' size={closeIconSize} />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
