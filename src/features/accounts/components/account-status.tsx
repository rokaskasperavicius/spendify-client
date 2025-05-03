import { Button } from '@/components/ui'

import { AccountStatuses } from '@/lib/generated'

type Props = {
  name: string | null
  lastSyncedAt: string
  status: AccountStatuses
  handleAccountReconnect: () => void
}

export const AccountStatus = ({
  lastSyncedAt,
  status,
  name,
  handleAccountReconnect,
}: Props) => (
  <div>
    {status === AccountStatuses.EXPIRED ? (
      <div className='space-y-2'>
        <div>
          Access to your account expired. To be able to see latest activity:
        </div>

        <Button
          variant='primary-two'
          fullWidth={false}
          onClick={() => handleAccountReconnect()}
        >
          Reconnect {name}
        </Button>
      </div>
    ) : (
      <div className='italic'>
        Last updated: {new Date(lastSyncedAt).toLocaleString()}
      </div>
    )}
  </div>
)
