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
    className='flex gap-4 cursor-pointer group'
    onClick={onClick}
    role='button'
  >
    <div>
      <Image size='md' src={bankLogo} alt='Bank Logo' />
    </div>

    <div className='overflow-hidden'>
      <div className='group-hover:underline truncate'>{accountName}</div>
      <div className='text-gray-500 text-sm mt-1 truncate'>{accountIban}</div>
    </div>
  </div>
)
