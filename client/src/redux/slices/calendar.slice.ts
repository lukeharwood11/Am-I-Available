import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState, CalendarEvent } from '../types';

const initialState: CalendarState = {
  events: [],
  loading: false,
  error: null,
  googleTokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setGoogleTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.googleTokens = action.payload;
    },
    clearGoogleTokens: (state) => {
      state.googleTokens = {
        accessToken: null,
        refreshToken: null,
      };
    },
    setCalendarError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default calendarSlice;