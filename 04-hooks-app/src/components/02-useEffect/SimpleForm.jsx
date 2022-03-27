import React, { useEffect, useState } from 'react';

import { Message } from './Message';

export default function SimpleForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
  });

  const { name, email } = formState;

  useEffect(() => {
    console.warn('Hi!')
  }, []);

  useEffect(() => {
    console.warn('Cambio en el form')
  }, [ formState ]);

  const handleInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    })
  };

  return (
    <div className='container my-3'>
      <h1>SimpleForm</h1>
      <hr />

      <div className='form-group my-2'>
        <input type="text"
               name="name"
               className='form-control'
               placeholder='Nombre'
               autoComplete='off'
               value={ name }
               onChange={ handleInputChange } />
      </div>

      <div className='form-group my-2'>
        <input type="email"
               name="email"
               className='form-control'
               placeholder='email@gmail.com'
               autoComplete='off'
               value={ email }
               onChange={ handleInputChange } />
      </div>

      { name && <Message /> }
    </div>
  )
}
