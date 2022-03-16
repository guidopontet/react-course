import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddCategory({ setCategories }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setCategories((categories) => ([ inputValue, ...categories ]));
    setInputValue('');
  };

  return (
    <form
      onSubmit={ handleSubmit }>
      <input
        type="text"
        value={ inputValue }
        onChange={ handleInputChange }
      />
    </form>
  )
}

AddCategory.propTypes = {
  setCategories: PropTypes.func.isRequired,
}

export default AddCategory;
