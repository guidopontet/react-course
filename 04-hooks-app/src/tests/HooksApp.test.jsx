import { shallow } from "enzyme";

import HooksApp from "../components/HooksApp";

describe('HooksApp', () => {
  test('should render', () => {
    const wrapper = shallow(<HooksApp />);
    expect(wrapper).toMatchSnapshot();
  });
})
