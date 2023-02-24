import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { slice, signOut } from 'features/auth/slice'
import { authApi } from 'features/auth/api'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [slice.name],
}

const combinedReducers = combineReducers({
  [slice.name]: slice.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

// Clear the redux store on logout
// https://stackoverflow.com/a/63992547
// https://bionicjulia.com/blog/clear-redux-toolkit-state-with-redux-persist-and-typescript
const reducerProxy = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction
) => {
  if (signOut.match(action)) {
    storage.removeItem('persist:root')

    return combinedReducers(undefined, action)
  }

  return combinedReducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, reducerProxy)

export const store = configureStore({
  reducer: persistedReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
