import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('authReducer', () => {
  test('should return default state', () => {
    const state = authReducer({ logged: false }, { });
    expect(state).toEqual({ logged: false });
  })

  test('should authenticate and add user name', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Guido',
      }
    }

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, name: 'Guido' });
  })

  test('should delete user name and logout', () => {
    const action = {
      type: types.logout,
    }

    const state = authReducer({ logged: true }, action);
    expect(state).toEqual({ logged: false });
  })
})
