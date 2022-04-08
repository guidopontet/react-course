import React from 'react'

export const TodoListItem = ({ todo, index, handleToggle, handleDelete}) => {
  return (
    <li key={ todo.id }
        className='list-group-item'>
      <p className={ todo.done ? 'complete' : '' }
          onClick={ () => handleToggle(todo) }>
        { index + 1 }. { todo.text }
      </p>

      <button className='btn btn-danger'
              onClick={ () => handleDelete(todo) }>Borrar</button>
    </li>
  )
}
