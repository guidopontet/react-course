import React from 'react';
import '@testing-library/jest-dom';

import { shallow } from "enzyme";

import AddCategory from "../../components/AddCategory";

describe('AddCategory', () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={ setCategories }/>);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={ setCategories }/>);
  });

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should change input text', () => {
    const input = wrapper.find('input');
    const value = 'Pokemón';

    input.simulate('change', { target: { value } });
  });

  test('should post data on submit', () => {
    wrapper.find('form').simulate('submit', { preventDefault(){} });

    expect(setCategories).toHaveBeenCalled();
  });

  test('should call setCategories and clear input', () => {
    const value = 'Hi world!';

    wrapper.find('input').simulate('change', { target: { value }});
    wrapper.find('form').simulate('submit', { preventDefault(){} });

    expect(setCategories).toHaveBeenCalled();
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));
    expect(wrapper.find('input').prop('value')).toBe('');
  });
});
