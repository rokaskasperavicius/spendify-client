import clsx from 'clsx'

type Props = {
  view: 'transactions' | 'expenses'
  setView: React.Dispatch<React.SetStateAction<'transactions' | 'expenses'>>
}

export const ViewSwitch = ({ view, setView }: Props) => {
  return (
    <>
      <div
        onClick={() => setView('transactions')}
        className={clsx('flex-1 py-2 px-4 cursor-pointer hover:bg-gray-50', {
          'bg-gray-50': view === 'transactions',
        })}
      >
        Transactions
      </div>

      <div
        onClick={() => setView('expenses')}
        className={clsx(
          'flex-1 py-2 px-4 border-l border-gray-300 hover:bg-gray-50 cursor-pointer',
          {
            'bg-gray-50': view === 'expenses',
          },
        )}
      >
        Monthly Overview
      </div>
    </>
  )
}
