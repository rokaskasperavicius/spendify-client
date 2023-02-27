export enum ERROR_CODES {
  UNKNOWN = -1,
  INVALID_EMAIL = 1,
  WRONG_PASSWORD = 2,
}

export type ErrorResponse = {
  success: false
  code: ERROR_CODES
}

export type SuccessResponse<T> = {
  success: true
  data: T
}
