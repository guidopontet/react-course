import { getGifs } from "../../helpers/getGifs";

describe('getGifs', () => {
  const category = 'Dragon Ball';

  test('should bring 10 elements', async () => {
    const gifs = await getGifs(category);

    expect(gifs.length).toBe(10);
  });
});
