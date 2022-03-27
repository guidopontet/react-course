import React, { useContext } from 'react'

import { UserContext } from './UserContext';

export const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='container my-3'>
      <h1>LoginScreen</h1>
      <hr />

      <button className='btn btn-primary'
              onClick={() => {
                setUser({
                  id: '123',
                  name: 'John Doe',
                });
              }}>
        Login
      </button>
    </div>
  )
}
