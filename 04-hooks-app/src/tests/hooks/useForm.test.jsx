import { renderHook, act } from '@testing-library/react-hooks';

import useForm from '../../hooks/useForm';

describe('useForm', () => {
  const initialForm = {
    name: 'Guido',
    email: 'guido@gmail.com'
  }

  test('should return default form', () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [ values, handleInputChange, reset ] = result.current;

    expect(values).toEqual(initialForm);
    expect(typeof handleInputChange).toBe('function');
    expect(typeof reset).toBe('function');
  });

  test('should update form value', () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [ , handleInputChange ] = result.current;

    act(() => {
        handleInputChange({
          target: {
            name: 'name',
            value: 'Guido',
          }
        })
    })

    const [ values ] = result.current;

    expect(values).toEqual({ ...initialForm, name: 'Guido' });
  });

  test('should reset form', () => {
    const { result } = renderHook(() => useForm(initialForm));

    const [ , handleInputChange, reset ] = result.current;

    act(() => {
        handleInputChange({
          target: {
            name: 'name',
            value: 'Guido',
          }
        })
    })

    const [ values ] = result.current;

    expect(values).toEqual({ ...initialForm, name: 'Guido' });

    act(reset);

    expect(values).toEqual(initialForm);
  });
 })