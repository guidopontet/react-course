import React, { useLayoutEffect, useRef, useState } from 'react'

import { useCounter } from '../../hooks/useCounter';
import { useFetch } from '../../hooks/useFetch';

import './layout.css';

export const LayoutEffect = () => {
  const { counter, increment } = useCounter(1);
  const url = `https://breakingbadapi.com/api/quotes/${counter}`;
  const { data } = useFetch(url);
  const { quote } = !!data && data[0];

  const quoteRef = useRef();

  const [boxSize, setBoxSize] = useState({});

  useLayoutEffect(() => {
    setBoxSize(quoteRef.current.getBoundingClientRect());
  }, [ quote ]);

  return (
    <div className='container my-3'>
      <h1>LayoutEffect</h1>
      <hr />

      <blockquote className='blockquote text-end'>
        <p className=''
           ref={ quoteRef }>{ quote }</p>
      </blockquote>

      <pre>{ JSON.stringify(boxSize, null ,3) }</pre>

      <button className='btn btn-primary'
              onClick={ increment }>Siguiente frase</button>
    </div>
  )
}
