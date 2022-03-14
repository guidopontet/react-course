import "@testing-library/jest-dom";

import { shallow } from 'enzyme';

import CounterApp from "../components/CounterApp";

describe('CounterApp', () => {
  let wrapper = shallow(<CounterApp />);

  beforeEach(() => {
    wrapper = shallow(<CounterApp />);
  });

  test('should show CounterApp', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should show default', () => {
    const wrapper = shallow(<CounterApp value={ 100 }/>);

    const counterText = wrapper.find('p').text().trim();

    expect(counterText).toBe("100");
  });

  test('should add counter 1 unit', () => {
    wrapper.find('button').at(2).simulate('click');

    const counterText = wrapper.find('p').text().trim();

    expect(counterText).toBe("11");
  });

  test('should minus counter 1 unit', () => {
    wrapper.find('button').at(0).simulate('click');

    const counterText = wrapper.find('p').text().trim();

    expect(counterText).toBe("9");
  });

  test('should reset counter', () => {
    const value = '5';
    const wrapper = shallow(<CounterApp value={ value }/>);

    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');

    const counterText = wrapper.find('p').text().trim();

    expect(counterText).toBe(value);
  });
 });
