import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents, syncWithGoogle } from '../hubs/calendar.hub';
import calendarSlice from '../slices/calendar.slice';
import { ERROR_MESSAGES } from '../constants';

// Fetch calendar events
export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(calendarSlice.actions.setLoading(true));
      const events = await getEvents();
      dispatch(calendarSlice.actions.setEvents(events));
      return events;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.CALENDAR.FETCH_EVENTS_FAILED;
      dispatch(calendarSlice.actions.setCalendarError(message));
      return rejectWithValue(message);
    }
  }
);

// Sync with Google Calendar
export const syncWithGoogleCalendar = createAsyncThunk(
  'calendar/syncWithGoogle',
  async (
    googleTokens: { accessToken: string; refreshToken: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(calendarSlice.actions.setLoading(true));
      const events = await syncWithGoogle(googleTokens);
      dispatch(calendarSlice.actions.setEvents(events));
      dispatch(calendarSlice.actions.setGoogleTokens(googleTokens));
      return events;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.CALENDAR.SYNC_FAILED;
      dispatch(calendarSlice.actions.setCalendarError(message));
      return rejectWithValue(message);
    }
  }
);
