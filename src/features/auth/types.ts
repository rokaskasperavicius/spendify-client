// Login
export type LoginUserResponse = {
  user: {
    name: string
    email: string
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
  name: string
  email: string
  password: string
}

// Destroy Session
export type DestroySessionBody = {
  sessionId: string
}

// Get Sessions
export type GetSessionsResponse = Session[]

type Session = {
  sessionId: string
  ipAddress: string
  ipLocation: string
  isCurrent: boolean
}

// Patch User Info
export type PatchUserInfoBody = {
  name: string
  email: string
}

export type PatchUserInfoResponse = {
  name: string
  email: string
}

// Patch User Password
export type PatchUserPasswordBody = {
  oldPassword: string
  newPassword: string
}
