import React from 'react';

import useForm from '../../hooks/useForm';

export default function FormWithCustomHook() {
  const [formValues, handleFormChange] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.warn(formValues)
  };

  return (
    <form onSubmit={ handleSubmit } className='container my-3'>
      <h1>FormWithCustomHook</h1>
      <hr />

      <div className='form-group my-2'>
        <input type="text"
               name="name"
               className='form-control'
               placeholder='Nombre'
               autoComplete='off'
               value={ name }
               onChange={ handleFormChange } />
      </div>

      <div className='form-group my-2'>
        <input type="email"
               name="email"
               className='form-control'
               placeholder='email@gmail.com'
               autoComplete='off'
               value={ email }
               onChange={ handleFormChange } />
      </div>

      <div className='form-group my-2'>
        <input type="password"
               name="password"
               className='form-control'
               placeholder='Password'
               autoComplete='off'
               value={ password }
               onChange={ handleFormChange } />
      </div>

      <button className='btn btn-primary'
              type='submit'>Guardar</button>
    </form>
  )
}
