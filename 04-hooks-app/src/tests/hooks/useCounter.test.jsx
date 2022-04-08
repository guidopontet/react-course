import { renderHook, act } from '@testing-library/react-hooks';

import { useCounter } from '../../hooks/useCounter';

describe('useCounter', () => {
  test('should return default values', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.decrement).toBe('function');
    expect(typeof result.current.reset).toBe('function');
   });

  test('should return initial value', () => {
    const { result } = renderHook(() => useCounter(100));

    expect(result.current.counter).toBe(100);
   });

  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter(100));

    const { increment } = result.current;

    act(increment);
    expect(result.current.counter).toBe(101);
   });

  test('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(100));

    const { decrement } = result.current;

    act(decrement);
    expect(result.current.counter).toBe(99);
   });

  test('should reset counter', () => {
    const { result } = renderHook(() => useCounter(100));

    const { increment, reset } = result.current;

    act(increment);
    act(reset);
    expect(result.current.counter).toBe(100);
   });
 })