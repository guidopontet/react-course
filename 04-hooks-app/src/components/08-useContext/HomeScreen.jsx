import React, { useContext } from 'react'

import { UserContext } from './UserContext'

export const HomeScreen = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='container my-3'>
      <h1>HomeScreen</h1>
      <hr />

      <pre>{ JSON.stringify(user, null, 4) }</pre>
    </div>
  )
}
