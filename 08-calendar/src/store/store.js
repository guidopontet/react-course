import { configureStore } from '@reduxjs/toolkit';

import { authSlice, calendarSlice, uiSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  // Por error al intentar serializar fechas
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
