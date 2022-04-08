import { shallow } from "enzyme";

import { TodoApp } from "../../../components/07-useReducer/TodoApp";

describe('TodoApp', () => {
  const wrapper = shallow(<TodoApp />);

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
})
