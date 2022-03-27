import React from 'react';

import { useCounter } from '../../hooks/useCounter';

export default function CounterWithCustomHook() {
  const { state, increment, decrement, reset } = useCounter();

  return (
    <div className='container py-3'>
      <h1>Counter with custom hook { state }</h1>
      <hr />

      <button onClick={ decrement } className='btn btn-primary mx-2'>-1</button>
      <button onClick={ reset } className='btn btn-primary mx-2'>Reset</button>
      <button onClick={ increment } className='btn btn-primary mx-2'>+1</button>
    </div>
  )
}
