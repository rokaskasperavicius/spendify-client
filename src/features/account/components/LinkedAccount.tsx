// Components
import { Image } from 'components/ui'

type Props = {
  bankLogo: string
  accountName: string
  accountIban: string
  onClick: () => void
}

export const LinkedAccount = ({
  bankLogo,
  accountName,
  accountIban,
  onClick,
}: Props) => (
  <div
    className='flex gap-4 items-center cursor-pointer group'
    onClick={onClick}
    role='button'
  >
    <Image size='md' src={bankLogo} alt='Bank Logo' />

    <div>
      <div className='group-hover:underline'>{accountName}</div>
      <div className='text-gray-500 text-sm mt-1'>{accountIban}</div>
    </div>
  </div>
)
