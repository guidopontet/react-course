import { useState } from 'react';

export const useCounter = (initialState = 10) => {
  const [counter, setCounter] = useState(initialState);

  const decrement = () => {
    setCounter(counter - 1);
  }

  const increment = () => {
    setCounter(counter + 1);
  }

  const reset = () => {
    setCounter(initialState);
  }

  return {
    counter,
    decrement,
    increment,
    reset,
  }
}
