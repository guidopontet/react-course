import { shallow } from 'enzyme';

import { RealExampleRef } from '../../../components/04-useRef/RealExampleRef';

describe('RealExampleRef', () => {
  const wrapper = shallow(<RealExampleRef />);

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('should render MultipleCustomHooks component', () => {
    wrapper.find('button').simulate('click');

    expect(wrapper.find('MultipleCustomHooks').exists()).toBe(true);
  })
})
