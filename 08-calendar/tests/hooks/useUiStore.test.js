import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useUiStore } from '../../src/hooks';
import { uiSlice } from '../../src/store';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    }
  })
}

describe('useUiStore', () => {
  test('should return default values', () => {
    const mockedStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{children}</Provider>,
    });

    const { isDateModalOpen } = result.current;

    expect(isDateModalOpen).toBe(false);
  })

  test('should set true on isDateModalOpen', () => {
    const mockedStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{children}</Provider>,
    });

    const { openDateModal } = result.current;

    act(() => { openDateModal(); });

    expect(result.current.isDateModalOpen).toBe(true);
  });

  test('should set false on isDateModalOpen', () => {
    const mockedStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{children}</Provider>,
    });

    const { closeDateModal } = result.current;

    act(() => { closeDateModal(); });

    expect(result.current.isDateModalOpen).toBe(false);
  });

  test('should toggle isDateModalOpen value', () => {
    const mockedStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockedStore }>{children}</Provider>,
    });

    const { toggleDateModal } = result.current;

    act(() => { toggleDateModal(); });
    expect(result.current.isDateModalOpen).toBe(false);
  });
});
