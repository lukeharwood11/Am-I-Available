import { configureStore } from '@reduxjs/toolkit';
import { authReducer, relationshipsReducer } from './slices';
import calendarSlice from './slices/calendar.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarSlice.reducer,
    relationships: relationshipsReducer,
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
