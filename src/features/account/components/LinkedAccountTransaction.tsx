type Props = {
  title: string
  category: string
  date: string
  amount: string
}

export const LinkedAccountTransaction = ({
  title,
  category,
  date,
  amount,
}: Props) => (
  <div className='flex items-start justify-between p-4'>
    <div>
      <div>
        <span className='font-medium'>{title}</span> ({category})
      </div>

      <div className='text-sm'>{date}</div>
    </div>

    <div className='font-medium'>{amount} DKK</div>
  </div>
)
