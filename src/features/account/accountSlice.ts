import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subMonths } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Hooks & Helpers
import { useAppSelector } from 'store/hooks'

// Types
import { IntervalProps } from './types'

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
  intervals: IntervalProps[]
}

export const accountSlice = createSlice({
  name: 'account',
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
} = accountSlice.actions

export const useAccountSlice = () =>
  useAppSelector((state) => state[accountSlice.name])