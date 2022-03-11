import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PrimerComponente = ({ greeting, paragraph }) => {
  return (
    <Fragment>
      <h1>{ greeting }</h1>
      <p>{ paragraph }</p>
    </Fragment>
  );
};

PrimerComponente.prototypes = {
  greeting: PropTypes.string,
};

PrimerComponente.defaultProps = {
  paragraph: 'Es un párrafo',
};

export default PrimerComponente;
