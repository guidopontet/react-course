import React, { useRef } from 'react'

export const FocusScreen = () => {

  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.select();
  }

  return (
    <div className='container my-3'>
      <h1>FocusScreen</h1>
      <hr />

      <input ref={ inputRef }
             type="text"
             className='form-control'
             placeholder='Nombre' />

      <button className='btn btn-outline-primary my-3'
              onClick={ handleClick }>Focus</button>
    </div>
  )
}
