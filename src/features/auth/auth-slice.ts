import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/features/auth/auth-api'

import { useAppSelector } from '@/store/hooks'

const initialState: State = {
  name: null,
  email: null,

  isAuthenticated: false,
}

type State = {
  name: string | null
  email: string | null

  isAuthenticated: boolean
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.isAuthenticated = true

          state.name = action.payload.user.name
          state.email = action.payload.user.email
        },
      )
      .addMatcher(
        authApi.endpoints.patchUserInfo.matchFulfilled,
        (state, action) => {
          state.name = action.payload.name
          state.email = action.payload.email
        },
      )
  },
})

export const { resetAuth } = authSlice.actions

export const useAuthState = () =>
  useAppSelector((state) => state[authSlice.name])
