import type { components } from './generated'
import { ErrorCodes } from './generated'

export const ERROR_CODES = ErrorCodes
export type ErrorResponse = components['schemas']['ApiError']
