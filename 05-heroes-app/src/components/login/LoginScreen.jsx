import { useContext } from "react";
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const action = {
      type: types.login,
      payload: {
        name: "Guido",
      }
    }

    dispatch(action);

    const path = localStorage.getItem("lastPath") || "/";

    navigate(path, { replace: true }); // Options to replace history and prevent back button
  }

  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr />

      <button
        className="btn btn-primary"
        onClick={ handleLogin }
      >
        Login
      </button>
    </div>
  )
}
