import { mount } from "enzyme";

import { LoginScreen } from "../../../components/08-useContext/LoginScreen";
import { UserContext } from "../../../components/08-useContext/UserContext";

describe('LoginScreen', () => {
  const setUser = jest.fn();

  const wrapper = mount(
    <UserContext.Provider value={
      { setUser }
    }>
      <LoginScreen />
    </UserContext.Provider>
  );

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call setUser with expected argument', () => {
    wrapper.find('button').prop('onClick')();

    expect(setUser).toHaveBeenCalledWith({
      id: '123',
      name: 'John Doe',
    });
  });
});