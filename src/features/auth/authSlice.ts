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

        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
      }
    )
  },
})

export const { signUserOut, refreshAccessToken } = authSlice.actions

export const useAuthState = () =>
  useAppSelector((state) => state[authSlice.name])
