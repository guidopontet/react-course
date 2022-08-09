import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUser } from '../fixtures/testUser';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    }
  })
}

describe('useAuthStore', () => {
  beforeEach(() => localStorage.clear());

  test('should return default values', () => {
    const mockedStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    expect(result.current).toEqual({
      ...initialState,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  })

  test('should login a user', async () => {
    const mockedStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.startLogin(testUser)
    });

    const { errorMessage, status, user } = result.current;

    expect({errorMessage, status, user}).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { uid: testUser.uid, name: testUser.name },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('should fail login', async () => {
    const mockedStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.startLogin({ ...testUser, password: 'wrong password' })
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBeNull();

    expect({errorMessage, status, user}).toEqual({
      errorMessage: expect.any(String),
      status: 'not-authenticated',
      user: { },
    });

    waitFor(
      () => expect(result.current.errorMessage).toBe(undefined),
    )
  })

  test('should register a user', async () => {
    const mockedStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: testUser.uid,
        name: testUser.name,
        token: 'token',
      }
    })

    await act(async () => {
      await result.current.startRegister({ ...testUser })
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { uid: testUser.uid, name: testUser.name },
    });

    spy.mockRestore();
  });

  test('should not register a user when it already exists', async () => {
    const mockedStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.startRegister( testUser)
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken should fail when no token', async () => {
    const mockedStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken()
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    });
  })

  test('checkAuthToken should authenticate if token exists', async () => {
    const { data } = await calendarApi.post('/auth', testUser); // Get real token from server
    localStorage.setItem('token', data.token);

    const mockedStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken()
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        name: data.name,
        uid: data.uid
      }
    });
  })
})
