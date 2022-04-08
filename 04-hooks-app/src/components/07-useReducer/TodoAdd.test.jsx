import { shallow } from "enzyme";

import { TodoAdd } from "./TodoAdd";

describe('TodoAdd', () => {
  const handleAddTodo = jest.fn();

  const wrapper = shallow(
    <TodoAdd
      handleAddTodo={ handleAddTodo }
    />
  );

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('should not call handleAddTodo', () => {
    const formSubmit = wrapper.find('form').prop('onSubmit');

    formSubmit({ preventDefault() {} });

    expect(handleAddTodo).not.toHaveBeenCalled();
  })

  test('should call handleAddTodo', () => {
    const value = 'Tarea 1';
    wrapper.find('input').simulate('change', { target: { value, name: 'description' } });

    const formSubmit = wrapper.find('form').prop('onSubmit');

    formSubmit({ preventDefault() {} });

    expect(handleAddTodo).toHaveBeenCalled();

    // Reset
    expect(wrapper.find('input').prop('value')).toBe('');
  })
})
