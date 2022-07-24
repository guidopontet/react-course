import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/auth";

describe('authSlice', () => {
  test('name should be "auth"', () => {
    expect(authSlice.name).toBe('auth');
  })

  test('return initial state', () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  })

  test('should do authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      errorMessage: null,
      ...demoUser,
    });
  })

  test('should do logout', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('should do logout with errorMessage', () => {
    const errorMessage = 'Something went wrong';

    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('should do checking credentials', () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state).toEqual({ ...initialState, status: 'checking' });
  });
})
