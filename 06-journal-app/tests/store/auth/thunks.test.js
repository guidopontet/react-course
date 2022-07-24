import { logoutFirebase, signInWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLogout, startSignInWithEmailPassword } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/auth";

jest.mock("../../../src/firebase/providers"); // mock the firebase providers

describe('thunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('should call "checkingCredentials"', async () => {

    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  })

  test('"startGoogleSignIn" should call checkingCredentials y login', async () => {
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('"startGoogleSignIn" should call checkingCredentials and logout', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' }
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  })

  test('"startSignInWithEmailPassword" should call checking credentials and login', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await signInWithEmailPassword.mockResolvedValue(loginData);
    await startSignInWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('"startLogout" should call logoutFirebase, clearNotesLogout and logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  })
})
