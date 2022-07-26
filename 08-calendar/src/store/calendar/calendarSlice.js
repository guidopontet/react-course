import { createSlice } from '@reduxjs/toolkit';

import { subHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Evento personalizado',
  notes: 'This is a note',
  start: subHours(new Date(), 8),
  end: subHours(new Date(), 1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Guido',
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvent,
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => event._id === payload._id ? payload : event);
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;