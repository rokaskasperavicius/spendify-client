// Login
export type LoginUserResponse = {
  firstName: string
  lastName: string

  accessToken: string
  refreshToken: string
}

export type LoginUser = {
  email: string
  password: string
}

// Register
export type RegisterUser = {
  firstName: string
  lastName: string
  email: string
  password: string
}
