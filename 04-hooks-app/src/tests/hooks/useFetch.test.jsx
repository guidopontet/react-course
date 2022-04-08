import { renderHook } from '@testing-library/react-hooks';

import { useFetch } from '../../hooks/useFetch';

describe('useFetch', () => {
  test('should return default data', () => {
    const { result } = renderHook(() => useFetch('https://breakingbadapi.com/api/quotes/1'));

    const { data, loading, error } = result.current;

    expect(data).toBe(null);
    expect(loading).toBe(true);
    expect(error).toBe(null);
  });

  test('should return desired data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://breakingbadapi.com/api/quotes/1'));

    await waitForNextUpdate({ timeout: false });

    const { data, loading, error } = result.current;

    expect(data.length).toBe(1);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });
});
