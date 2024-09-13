import { paths } from '@/lib/generated'

/** [POST] /auth/login */
type LoginUserPath = paths['/auth/login']['post']

export type LoginUserResponse =
  LoginUserPath['responses']['200']['content']['application/json']

export type LoginUserRequest =
  LoginUserPath['requestBody']['content']['application/json']

/** [POST] /auth/register */
type RegisterUserPath = paths['/auth/register']['post']

export type RegisterUserResponse =
  RegisterUserPath['responses']['200']['content']['application/json']

export type RegisterUserRequest =
  RegisterUserPath['requestBody']['content']['application/json']

/** [DELETE] /auth/destroy-session */
type DestroySessionPath = paths['/auth/destroy-session']['delete']

export type DestroySessionRequest =
  DestroySessionPath['requestBody']['content']['application/json']

export type DestroySessionResponse =
  DestroySessionPath['responses']['200']['content']['application/json']

/** [POST] /auth/log-out */
type LogOutPath = paths['/auth/log-out']['post']

export type LogOutRequest = LogOutPath['requestBody']

export type LogOutResponse =
  LogOutPath['responses']['200']['content']['application/json']

/** [PATCH] /auth/user-info */
type PatchUserInfoPath = paths['/auth/user-info']['patch']

export type PatchUserInfoRequest =
  PatchUserInfoPath['requestBody']['content']['application/json']

export type PatchUserInfoResponse =
  PatchUserInfoPath['responses']['200']['content']['application/json']

/** [PATCH] /auth/user-password */
type PatchUserPasswordPath = paths['/auth/user-password']['patch']

export type PatchUserPasswordRequest =
  PatchUserPasswordPath['requestBody']['content']['application/json']

export type PatchUserPasswordResponse =
  PatchUserPasswordPath['responses']['200']['content']['application/json']

/** [GET] /auth/sessions */
type SessionsPath = paths['/auth/sessions']['get']

export type SessionsParams = SessionsPath['parameters']['query']

export type SessionsResponse =
  SessionsPath['responses']['200']['content']['application/json']
