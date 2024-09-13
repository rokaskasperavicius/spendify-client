const PREFIX = '/auth'

export const AUTH_PATHS = {
  LOGIN: `${PREFIX}/login`,
  REGISTER: `${PREFIX}/register`,
  DESTROY_SESSION: `${PREFIX}/destroy-session`,
  LOG_OUT: `${PREFIX}/log-out`,
  USER_INFO: `${PREFIX}/user-info`,
  USER_PASSWORD: `${PREFIX}/user-password`,
  SESSIONS: `${PREFIX}/sessions`,
}

export enum AUTH_TAGS {
  DEVICES = 'Devices',
}
