const { shallow } = require("enzyme");

const { default: GifExperApp } = require("../../components/GifExperApp");

describe('GifExperApp', () => {
  test('should render component', () => {
    const wrapper = shallow(<GifExperApp />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a list of categories', () => {
    const categories = ['Pokemón', 'Dragon Ball'];

    const wrapper = shallow(<GifExperApp defaultCategories={ categories } />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('GifGrid').length).toBe(categories.length);
  });
});
