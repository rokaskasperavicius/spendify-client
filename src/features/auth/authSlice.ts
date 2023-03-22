import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Hooks & Helpers
import { useAppSelector } from 'store/hooks'
import { authApi } from 'features/auth/authApi'

const initialState: State = {
  firstName: null,
  lastName: null,

  accessToken: null,
  refreshToken: null,
}

type State = {
  firstName: string | null
  lastName: string | null

  accessToken: string | null
  refreshToken: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUserOut: () => initialState,

    setUserTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.auth.accessToken
        state.refreshToken = action.payload.auth.refreshToken

        state.firstName = action.payload.user.firstName
        state.lastName = action.payload.user.lastName
      }
    )
  },
})

export const { signUserOut, setUserTokens } = authSlice.actions

export const useAuthState = () =>
  useAppSelector((state) => state[authSlice.name])
