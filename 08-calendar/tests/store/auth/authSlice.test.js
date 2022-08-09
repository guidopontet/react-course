import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUser } from "../../fixtures/testUser";

describe('authSlice', () => {
  test('should return initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('should login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUser));

    expect(state).toEqual(authenticatedState);
  });

  test('should logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual(notAuthenticatedState);
  })

  test('should logout with error message', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  })

  test('should clear error message', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBeUndefined();
  });
});
