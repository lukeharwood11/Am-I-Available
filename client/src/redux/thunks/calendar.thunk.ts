import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents, syncWithGoogle } from '../hubs/calendar.hub';
import { 
    calendarActions
} from '../slices/calendar.slice';
import { ERROR_MESSAGES } from '../constants';

// Fetch calendar events
export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(calendarActions.setLoading(true));
      const events = await getEvents();
      dispatch(calendarActions.setEvents(events));
      return events;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.CALENDAR.FETCH_EVENTS_FAILED;
      dispatch(calendarActions.setCalendarError(message));
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
      dispatch(calendarActions.setLoading(true));
      const events = await syncWithGoogle(googleTokens);
      dispatch(calendarActions.setEvents(events));
      dispatch(calendarActions.setGoogleTokens(googleTokens));
      return events;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.CALENDAR.SYNC_FAILED;
      dispatch(calendarActions.setCalendarError(message));
      return rejectWithValue(message);
    }
  }
);
