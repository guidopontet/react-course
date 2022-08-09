import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";

import { AppRouter } from "../../src/router/AppRouter";

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('AppRouter', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should render loading screen and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText('Checking...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  })

  test('should render login when not authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeTruthy();
    expect(container).toMatchSnapshot();
  })

  test('should render calendar when authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  })
})