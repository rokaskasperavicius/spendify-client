import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/api'
import { useAppSelector } from 'hooks'

const initialState: State = {
  accessToken: null,
  refreshToken: null,
}

type State = {
  accessToken: string | null
  refreshToken: string | null
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
    )
  },
})

// Action creators are generated for each case reducer function
export const { signOut } = slice.actions

export const useAuthState = () => useAppSelector((state) => state.auth)
