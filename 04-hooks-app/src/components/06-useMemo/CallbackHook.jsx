import React, { useCallback, useState } from 'react';

import { ShowIncrement } from './ShowIncrement';

export const CallbackHook = () => {
  const [counter, setCounter] = useState(10);

  const increment = useCallback(
    () => {
      setCounter((c) => c + 1);
    },
    [ setCounter ],
  )

  return (
    <div className='container my-3'>
      <h1>CallbackHook</h1>
      <hr />

      <h3>Counter: { counter }</h3>

      <ShowIncrement increment={ increment } />
    </div>
  )
}
