const { renderHook } = require("@testing-library/react-hooks");

const { useFetchGifs } = require("../../hooks/useFetchGifs");

describe('useFetchGifs', () => {
  test('should return initial state', async () => {
    const category = 'Dragon Ball';
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category));
    const  { data, loading } = result.current;

    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });

  test('should return array image and loading', async () => {
    const category = 'Dragon Ball';
    const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category));

    await waitForNextUpdate();

    const  { data, loading } = result.current;

    expect(data.length).toBe(10);
    expect(loading).toBe(false);
  });
});