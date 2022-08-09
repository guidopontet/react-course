import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState, newEvent } from "../../fixtures/calendarStates";

describe('calendarSlice', () => {
  test('should return initial state', () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  })

  test('should set active event', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));

    expect(state.activeEvent).toEqual(events[0]);
  })

  test('should add new event', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('should update event', () => {
    const updatedEvent = {
      ...events[0],
      title: 'Updated event',
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));

    expect(state.events).toContain(updatedEvent);
  });

  test('should delete active event', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());

    expect(state.events).not.toContain(events[0]);
    expect(state.activeEvent).toBeNull();
  });

  test('should load events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBe(false);
  });

  test('should logout calendar', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());

    expect(state.events).toEqual([]);
    expect(state.isLoadingEvents).toBe(true);
  });
})