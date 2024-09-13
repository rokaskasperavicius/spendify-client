import { TransactionViewSwitchItem } from './transactions-view-switch-item'

type Props = {
  view: 'list' | 'line'
  setView: React.Dispatch<React.SetStateAction<'list' | 'line'>>
}

export const TransactionsViewSwitch = ({ view, setView }: Props) => {
  return (
    <div className='flex gap-2'>
      <TransactionViewSwitchItem
        name='List'
        isUnderlined={view === 'list'}
        onClick={() => setView('list')}
      />

      <TransactionViewSwitchItem
        name='Line'
        isUnderlined={view === 'line'}
        onClick={() => setView('line')}
      />
    </div>
  )
}
