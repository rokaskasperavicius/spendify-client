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

// Sign Out
export type SignOutUserBody = {
  refreshToken: string
}

// Get User Devices
type UserDevice = {
  refreshToken: string
  ipAddress: string
  ipLocation: string
}

export type GetUserDevicesResponse = UserDevice[]

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
