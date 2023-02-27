import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Hooks & Helpers
import { useAppSelector } from 'store/hooks'
import { authApi } from 'features/auth/authApi'

const initialState: State = {
  accessToken: null,
  refreshToken: null,
}

type State = {
  accessToken: string | null
  refreshToken: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUserOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },

    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
    )
  },
})

export const { signUserOut, refreshAccessToken } = authSlice.actions

export const useAuthState = () =>
  useAppSelector((state) => state[authSlice.name])
