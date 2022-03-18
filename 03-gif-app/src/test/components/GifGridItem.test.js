import { shallow } from "enzyme";

import GifGridItem from "../../components/GifGridItem";


describe('GifFridItem', () => {
  const title = 'Title example';
  const url = 'https://example.com/image.png';
  const wrapper = shallow( <GifGridItem title={ title } url={ url }/> );

  test('should show component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render title on a paragraph', () => {
    const p = wrapper.find('p');

    expect(p.text().trim()).toBe(title);
  });

  test('should render image with url and title', () => {
    const img = wrapper.find('img');

    expect(img.prop('src')).toBe(url);
    expect(img.prop('alt')).toBe(title);
  });
});
