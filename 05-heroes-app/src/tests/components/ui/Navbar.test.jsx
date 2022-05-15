import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mount } from "enzyme";

import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Navbar', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: 'Guido',
      logged: true,
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Navbar />}/>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text()).toBe('Guido');
  })

  test('should call logout with params', () => {
    wrapper.find('button').simulate('click');

    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  })
})
