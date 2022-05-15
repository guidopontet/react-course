import { mount } from 'enzyme';

import { AppRouter } from '../../routes/AppRoutes';
import { AuthContext } from '../../auth/authContext';

describe('AppRouter', () => {
  test('should render Login if not authenticated', () => {
    const contextValue = {
      user: {
        logged: false,
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    )

    expect(wrapper.find('h1').text().trim()).toBe('LoginScreen');
  })

  test('should render Marvel if authenticated', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'Guido',
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    )

    expect(wrapper.find('h1').text().trim()).toBe('Marvel');
  })
})
