import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subMonths } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Hooks & Helpers
import { useAppSelector } from 'store/hooks'

const initialState: State = {
  intervals: [
    {
      id: uuid(),
      from: subMonths(new Date(), 1).getTime(),
      to: new Date().getTime(),
    },
  ],
}

type State = {
  intervals: Array<{
    id: string
    from: number | undefined
    to: number | undefined
  }>
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccountsInterval: (state) => {
      state.intervals = [
        ...state.intervals,
        { id: uuid(), from: undefined, to: undefined },
      ]
    },

    removeAccountsInterval: (state, action: PayloadAction<{ id: string }>) => {
      const filteredIntervals = state.intervals.filter(
        (interval) => interval.id !== action.payload.id
      )

      state.intervals = filteredIntervals
    },

    changeAccountsInterval: (
      state,
      action: PayloadAction<{
        id: string
        from: number | undefined
        to: number | undefined
      }>
    ) => {
      const { id, from, to } = action.payload

      const changedIntervals = state.intervals.map((interval) => {
        if (interval.id === id) {
          return {
            ...interval,
            from: from,
            to: to,
          }
        }

        return interval
      })

      state.intervals = changedIntervals
    },
  },
})

export const {
  addAccountsInterval,
  removeAccountsInterval,
  changeAccountsInterval,
} = accountsSlice.actions

export const useAccountsSlice = () =>
  useAppSelector((state) => state[accountsSlice.name])
