import React, { useMemo, useState } from 'react'

import { heavyProcess } from '../../helpers/heavyProcess';
import { useCounter } from "../../hooks/useCounter";

export const MemoHook = () => {
  const { counter, increment } = useCounter(1000);
  const [show, setShow] = useState(true);

  const memoHeavyProcess = useMemo(() => heavyProcess(counter), [ counter ])

  return (
    <div className='container my-3'>
      <h1>MemoHook</h1>
      <h3>Counter: <small>{ counter }</small></h3>
      <hr />

      <p>{ memoHeavyProcess }</p>

      <button className='btn btn-primary'
              onClick={ increment }> +1
      </button>

      <button className='btn btn-outline-primary mx-3'
              onClick={ () => setShow(!show) }>
        Show / Hide { JSON.stringify(show) }
      </button>
    </div>
  )
}
