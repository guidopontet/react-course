import { shallow } from 'enzyme';

import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useFetch } from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');

describe('MultipleCustomHooks', () => {
  test('should render', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);
    expect(wrapper).toMatchSnapshot();
  })

  test('should show data', () => {
    useFetch.mockReturnValue({
      data: [{
        author: 'Guido',
        quote: 'Hola',
      }],
      loading: false,
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper.find('.alert').exists()).toBe(false);
    expect(wrapper.find('.mb-0').text().trim()).toBe('Hola');
    expect(wrapper.find('footer').text().trim()).toBe('Guido');
  })
})
