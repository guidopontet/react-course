import { shallow } from 'enzyme';

import { TodoListItem } from '../../../components/07-useReducer/TodoListItem';
import { demoTodos } from '../../fixtures/demoTodos';

describe('TodoListItem', () => {
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoListItem
      todo={demoTodos[0]}
      index={0}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDelete function', () => {
    wrapper.find('button').simulate('click');
    expect(handleDelete).toHaveBeenCalledWith(demoTodos[0]);
  });

  it('should call handleToggle function', () => {
    wrapper.find('p').simulate('click');
    expect(handleToggle).toHaveBeenCalledWith(demoTodos[0]);
  });

  it('should show text correctly', () => {
    const p = wrapper.find('p');
    expect(p.text()).toBe(`1. ${demoTodos[0].text}`);
  });

  it('should have complete class if item is done', () => {
    const todo = demoTodos[0];
    todo.done = true;

    const wrapper = shallow(<TodoListItem todo={todo} />);

    expect(wrapper.find('p').hasClass('complete')).toBe(true);
  });
});
