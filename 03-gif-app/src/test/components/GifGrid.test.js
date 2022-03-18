const { shallow } = require("enzyme");

const { default: GifGrid } = require("../../components/GifGrid");
const { useFetchGifs } = require("../../hooks/useFetchGifs");
jest.mock('../../hooks/useFetchGifs');

describe('GifGrid', () => {
  const category = 'Dragon Ball';

  test('should render component', () => {
    useFetchGifs.mockReturnValue({
      data: [],
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={ category }/>);

    expect(wrapper).toMatchSnapshot();
  });

  test('should show items when images are loaded', () => {
    const gifs = [{
      id: 'asd',
      url: 'https://example.com/image.png',
      title: 'Example',
    }]

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={ category }/>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('p').exists()).toBe(false);
    expect(wrapper.find('GifGridItem').length).toBe(gifs.length);
  });
});
