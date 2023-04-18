type Props = {
  title: string
  category: string
  date: string
  amount: string
  totalAmount: string
}

export const LinkedAccountTransaction = ({
  title,
  category,
  date,
  amount,
  totalAmount,
}: Props) => (
  <div className='p-4 even:bg-gray-50'>
    <div className='flex justify-between gap-4'>
      <div>
        <span className='font-medium'>{title}</span> ({category})
      </div>

      <div className='font-medium shrink-0'>{amount} DKK</div>
    </div>

    <div className='text-sm flex justify-between gap-4'>
      <div>{date}</div>
      <div>{totalAmount} DKK</div>
    </div>
  </div>
)
