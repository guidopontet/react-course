// import React from 'react';
// import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { shallow } from 'enzyme';

import PrimerComponente from "../components/PrimerComponente";

describe('PrimerComponente', () => {
  // test('should show greeting message', () => {
  //   const greeting = 'Hola Crack,';

  //   const screen = render(<PrimerComponente greeting='Hola Crack,' />);

  //   expect(screen.getByText(greeting)).toBeInTheDocument();
  //  });

  test('should show PrimerComponente', () => {
    const greeting = 'Hola Crack,';
    const wrapper = shallow(<PrimerComponente greeting='Hola Crack,'/>);

    expect(wrapper).toMatchSnapshot();
  });

  test('should render paragraph by argument', () => {
    const greeting = 'Hola Crack,';
    const paragraph = 'Es un párrafo';
    const wrapper = shallow(
      <PrimerComponente
        greeting={ greeting }
        paragraph={ paragraph }/>
    );

    const paragraphText = wrapper.find('p').text();

    expect(paragraphText).toBe(paragraph);
  });
 });
