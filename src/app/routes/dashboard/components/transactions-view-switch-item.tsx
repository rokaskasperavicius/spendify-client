import clsx from 'clsx'

type Props = {
  name: string
  isUnderlined: boolean
  onClick: () => void
}

export const TransactionViewSwitchItem = ({
  name,
  isUnderlined,
  onClick,
}: Props) => (
  <div
    className={clsx('cursor-pointer hover:underline select-none', {
      underline: isUnderlined,
    })}
    onClick={onClick}
  >
    {name}
  </div>
)
