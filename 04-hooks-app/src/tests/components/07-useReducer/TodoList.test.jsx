import { shallow } from "enzyme";

import { TodoList } from "../../../components/07-useReducer/TodoList";

import { demoTodos } from "../../fixtures/demoTodos";

describe('TodoList', () => {
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoList
      todos={ demoTodos }
      handleDelete={ handleDelete }
      handleToggle={ handleToggle }
    />
  );

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have 2 <TodoListItem />', () => {
    expect(wrapper.find('TodoListItem').length).toBe(demoTodos.length);
    expect(wrapper.find('TodoListItem').at(0).prop('handleDelete')).toEqual(expect.any(Function));
  });
});
