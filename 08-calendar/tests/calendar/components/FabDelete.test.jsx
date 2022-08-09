import { fireEvent, render, screen } from '@testing-library/react';

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from '../../../src/hooks';

jest.mock('../../../src/hooks/useCalendarStore.js');

describe('FabDelete', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should render component', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');

    expect(btn.classList.contains('fab-danger')).toBe(true);
  })

  test('should show button if event is selected', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');

    expect(btn.style.display).toBe('');
  })

  test('should call startDeletingEvent when click', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('btn-delete');

    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  })
})