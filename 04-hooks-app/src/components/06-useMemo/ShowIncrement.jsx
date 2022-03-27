import React from 'react'

export const ShowIncrement = ({ increment }) => {
  console.warn('ShowIncremente')

  return (
    <button className='btn btn-primary'
            onClick={increment }>Incrementar</button>
  )
}
