import { configureStore } from '@reduxjs/toolkit';
import { authReducer, relationshipsReducer, eventRequestsReducer } from './slices';
import calendarSlice from './slices/calendar.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarSlice.reducer,
    relationships: relationshipsReducer,
    eventRequests: eventRequestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
