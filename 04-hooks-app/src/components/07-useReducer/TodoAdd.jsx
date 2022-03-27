import React from 'react'

import useForm from '../../hooks/useForm'

export const TodoAdd = ({ handleAddTodo }) => {
  const [ { description }, handleInputChange, resetForm ] = useForm({
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim().length < 1 ) { return; }

    const newTodo = {
      id: new Date().getTime(),
      description: description,
      done: false,
    };

    const action = {
      type: 'ADD',
      payload: newTodo,
    }

    handleAddTodo(action);
    resetForm();
  }

  return (
    <>
      <h4>Agregar TODO</h4>
      <hr />

      <form onSubmit={ handleSubmit }>
        <input type="text"
                className='form-control'
                name='description'
                placeholder='Ingresa la tarea'
                autoComplete='off'
                value={ description }
                onChange={ handleInputChange }/>

        <button type='submit'
                className='btn btn-primary btn-block mt-3'>
          Agregar
        </button>
      </form>
    </>
  )
}
