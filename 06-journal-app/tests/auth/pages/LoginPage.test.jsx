import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState }  from '../../fixtures/auth';

const mockStartGoogleSignIn = jest.fn();
const mockStartSignInWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startSignInWithEmailPassword: ({ email, password }) => {
    return () => mockStartSignInWithEmailPassword(email, password);
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('LoginPage', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render correctly', () => {
    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Google button should call startGoogleSignIn', () => {
    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByLabelText('google-btn');
    fireEvent.click(googleButton);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  })

  test('submit should startSignInWithEmailPassword', () => {
    const email = 'guido@google.com';
    const password = '123456';

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug(); // To see the DOM

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    expect(mockStartSignInWithEmailPassword).toHaveBeenCalledWith(email, password);
  });
});