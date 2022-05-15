import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routes/PrivateRoute";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>Redireccionando</span>
}));

describe('PrivateRoute', () => {
  Storage.prototype.setItem = jest.fn();

  test('should render component if logged and save in localStorage', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'Guido'
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text().trim()).toBe('Private component');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
  })

  test('should block component if not authenticated', () => {
    const contextValue = {
      user: {
        logged: false,
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe('Redireccionando');
  })
})
