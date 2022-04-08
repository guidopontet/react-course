import { todoReducer } from "../../../components/07-useReducer/todoReducer";
import { demoTodos } from "../../fixtures/demoTodos";

describe('todoReducer', () => {
  test('should return default state', () => {
    const state = todoReducer(demoTodos, {});
    expect(state).toEqual(demoTodos);
  });

  test('should add todo', () => {
    const newTodo = {
      id: 3,
      text: 'Learn React',
      done: false
    }

    const action = {
      type: 'ADD',
      payload: newTodo,
    };

    const state = todoReducer(demoTodos, action);

    expect(state.length).toBe(3);
    expect(state).toEqual([...demoTodos, newTodo]);
  });

  test('should delete todo', () => {
    const action = {
      type: 'DELETE',
      payload: 1,
    };

    const state = todoReducer(demoTodos, action);

    expect(state.length).toBe(1);
    expect(state).toEqual([ demoTodos[1] ]);
  });

  test('should TOGGLE todo', () => {
    const action = {
      type: 'TOGGLE',
      payload: 1,
    };

    const state = todoReducer(demoTodos, action);

    expect(state[0].done).toBe(true);
    expect(state[1].done).toBe(demoTodos[1].done);
  });
});
