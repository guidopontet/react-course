import { mount } from "enzyme";

import { HomeScreen } from "../../../components/08-useContext/HomeScreen";
import { UserContext } from "../../../components/08-useContext/UserContext";

describe('HomeScreen', () => {
  const user = { name: 'Luis', email: 'luis@gmail.com' };

  const wrapper = mount(
    <UserContext.Provider value={
      { user }
    }>
      <HomeScreen />
    </UserContext.Provider>
  );

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
