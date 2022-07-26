import { configureStore } from '@reduxjs/toolkit';

import { calendarSlice, uiSlice } from './';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  // Por error al intentar serializar fechas
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
