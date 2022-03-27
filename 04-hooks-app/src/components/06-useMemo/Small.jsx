import React from 'react'

export const Small = React.memo(({ value }) => {
  console.warn('Inicio de componente Small')
  return (
    <small>{ value }</small>
  )
})
