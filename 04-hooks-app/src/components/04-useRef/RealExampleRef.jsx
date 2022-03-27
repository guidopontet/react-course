import React, { useState } from 'react'

import { MultipleCustomHooks } from "../03-examples/MultipleCustomHooks";

export const RealExampleRef = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='container my-3'>
      <h1>RealExampleRef</h1>
      <hr />

      { show && <MultipleCustomHooks />}

      <button className='btn btn-primary my-5'
              onClick={ () => setShow(!show) }>Mostrar / Ocultar</button>
    </div>
  )
}
