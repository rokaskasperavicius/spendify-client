// Login
export type LoginUserResponse = {
  user: {
    firstName: string
    lastName: string
  }

  auth: {
    accessToken: string
    refreshToken: string
  }
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
