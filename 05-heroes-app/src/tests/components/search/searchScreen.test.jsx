import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"

import { SearchScreen } from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('SearchScreen', () => {
  test('should render with default values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[name="searchText"]').prop('value')).toBe('');
  })

  test('should show batman with "batman" as seachText', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[name="searchText"]').prop('value')).toBe('batman');
  })

  test('should show error when no hero match', () => {
    const searchText = '1234';

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${searchText}`]}>
        <SearchScreen />
      </MemoryRouter>
    )

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-danger').text()).toBe(`No hay resultados: ${searchText}`);
  })

  test('should call handleSubmit on search', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    )

    wrapper.find('input').simulate('change', { target: { name: 'searchText', value: 'batman' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
  })
})
