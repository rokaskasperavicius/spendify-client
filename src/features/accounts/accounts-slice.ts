import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { subMonths } from 'date-fns'
import { v4 as uuid } from 'uuid'

import { useAppSelector } from '@/store/hooks'

import { IntervalProps } from './accounts-types'

const initialState: State = {
  intervals: [
    {
      id: uuid(),
      from: subMonths(new Date(), 1).getTime(),
      to: null,
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
        { id: uuid(), from: null, to: null },
      ]
    },

    removeAccountsInterval: (state, action: PayloadAction<{ id: string }>) => {
      const filteredIntervals = state.intervals.filter(
        (interval) => interval.id !== action.payload.id,
      )

      state.intervals = filteredIntervals
    },

    changeAccountsInterval: (
      state,
      action: PayloadAction<{
        id: string
        from: number | null
        to: number | null
      }>,
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
