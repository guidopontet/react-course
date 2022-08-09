import { testUser } from "./testUser"

export const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
}

export const authenticatedState = {
  status: 'authenticated',
  user: testUser,
  errorMessage: undefined
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
}
