import React, { useEffect, useReducer } from 'react';

import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';
import { todoReducer } from './todoReducer';

import './styles.css';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const TodoApp = () => {
  const [ todos, dispatch ] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (todo) => {
    const action = {
      type: 'DELETE',
      payload: todo.id,
    }

    dispatch(action);
  }

  const handleToggle = (todo) => {
    const action = {
      type: 'TOGGLE',
      payload: todo.id,
    }

    dispatch(action);
  }

  const handleAddTodo = ((action) => {
    dispatch(action);
  })

  return (
    <div className='container my-3'>
      <h1>TodoApp ({ todos.length })</h1>
      <hr />

      <div className='row'>
        <div className='col-7'>
          <TodoList todos={ todos }
                    handleToggle={ handleToggle }
                    handleDelete= { handleDelete } />
        </div>
        <div className='col-5'>
          <TodoAdd handleAddTodo={ handleAddTodo }/>
        </div>
      </div>
    </div>
  )
}
