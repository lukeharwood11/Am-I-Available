import { configureStore } from '@reduxjs/toolkit';
import { authReducer, calendarReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
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
