import { useNavigate } from 'react-router-dom'

// Assets
import ArrowLeft from 'assets/arrow-left.svg'

// Components
import { Image } from 'components/ui'

type Props = {
  title: string
}

export const ConnectAccountHeader = ({ title }: Props) => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-between md:items-center mt-4 flex-col md:flex-row'>
      <div
        className='cursor-pointer hover:underline flex items-center gap-1'
        onClick={() => navigate('/')}
      >
        <Image size='smm' alt='arrow left' src={ArrowLeft} />
        <div>Go Back</div>
      </div>

      <h1 className='text-lg text-center mt-2 md:mt-0'>{title}</h1>

      <div />
    </div>
  )
}
