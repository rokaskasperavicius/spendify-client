import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Hooks & Helpers
import { useAppSelector } from 'store/hooks'
import { authApi } from 'features/auth/authApi'

const initialState: State = {
  name: null,
  email: null,

  accessToken: null,
  refreshToken: null,
}

type State = {
  name: string | null
  email: string | null

  accessToken: string | null
  refreshToken: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },

    resetStore: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.accessToken = action.payload.auth.accessToken
          state.refreshToken = action.payload.auth.refreshToken

          state.name = action.payload.user.name
          state.email = action.payload.user.email
        }
      )
      .addMatcher(
        authApi.endpoints.patchUserInfo.matchFulfilled,
        (state, action) => {
          state.name = action.payload.name
          state.email = action.payload.email
        }
      )
  },
})

export const { setUserTokens, resetStore } = authSlice.actions

export const useAuthState = () =>
  useAppSelector((state) => state[authSlice.name])
