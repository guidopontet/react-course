import { checkingCredentials, login, logout } from "./authSlice";
import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startLogout = () => {
  return async( dispatch ) => {
    await logoutFirebase();

    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) { return dispatch(logout(result)); }

    dispatch(login(result));
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) { return dispatch(logout({ errorMessage })); }

    dispatch(login({ uid, displayName, email, photoURL }));
  }
}

export const startSignInWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithEmailPassword({ email, password });

    if (!result.ok) { return dispatch(logout(result)); }

    dispatch(login(result));
  }
};
