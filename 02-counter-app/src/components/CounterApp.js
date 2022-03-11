import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const CounterApp = ({ value }) => {

  const [ counter, setCounter ] = useState(value);

  const addNumber = () => {
    setCounter(counter + 1);
  };

  const lessNumber = () => {
    setCounter(counter - 1);
  }

  const resetNumber = () => {
    setCounter(value);
  }


  return (
    <Fragment>
      <h1>CounterApp</h1>
      <p>{ counter }</p>

      <button onClick={ lessNumber }>-1</button>
      <button onClick={ resetNumber }>Reset</button>
      <button onClick={ addNumber }>+1</button>
    </Fragment>
  );
};

CounterApp.prototypes = {
  value: PropTypes.number,
};

CounterApp.defaultProps = {
  value: 1,
};

export default CounterApp;
