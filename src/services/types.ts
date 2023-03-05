export enum ERROR_CODES {
  UNKNOWN = -1,
  INVALID_CREDENTIALS = 1,
}

export type ErrorResponse = {
  success: false
  code: ERROR_CODES
}

export type SuccessResponse<T> = {
  success: true
  data: T
}
