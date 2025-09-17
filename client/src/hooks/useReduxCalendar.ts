import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchCalendarEvents,
  syncWithGoogleCalendar,
} from '../redux/thunks/calendar.thunk';
import {
  selectCalendarEvents,
  selectCalendarLoading,
  selectCalendarError,
  selectGoogleTokens,
  selectEventById,
  selectEventsCount,
  selectHasEvents,
  selectEventsByDate,
  selectUpcomingEvents,
  selectHasGoogleTokens,
} from '../redux/selectors/calendar.selectors';
import { CalendarEvent } from '../redux/types';

interface UseReduxCalendarReturn {
  // State
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  googleTokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };

  // Actions
  loadEvents: () => Promise<void>;
  syncWithGoogle: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;

  // Selectors
  getEventById: (id: string) => CalendarEvent | undefined;
  getEventsCount: () => number;
  getHasEvents: () => boolean;
  getEventsByDate: (date: string) => CalendarEvent[];
  getUpcomingEvents: () => CalendarEvent[];
  getHasGoogleTokens: () => boolean;
}

export const useReduxCalendar = (): UseReduxCalendarReturn => {
  const dispatch = useAppDispatch();

  // State selectors
  const events = useAppSelector(selectCalendarEvents);
  const loading = useAppSelector(selectCalendarLoading);
  const error = useAppSelector(selectCalendarError);
  const googleTokens = useAppSelector(selectGoogleTokens);

  // Actions
  const loadEvents = useCallback(async () => {
    await dispatch(fetchCalendarEvents());
  }, [dispatch]);

  const syncWithGoogle = useCallback(
    async (tokens: { accessToken: string; refreshToken: string }) => {
      await dispatch(syncWithGoogleCalendar(tokens));
    },
    [dispatch]
  );

  // Selector functions
  const getEventById = useCallback((id: string) => {
    return useAppSelector(selectEventById(id));
  }, []);

  const getEventsCount = useCallback(() => {
    return useAppSelector(selectEventsCount);
  }, []);

  const getHasEvents = useCallback(() => {
    return useAppSelector(selectHasEvents);
  }, []);

  const getEventsByDate = useCallback((date: string) => {
    return useAppSelector(selectEventsByDate(date));
  }, []);

  const getUpcomingEvents = useCallback(() => {
    return useAppSelector(selectUpcomingEvents);
  }, []);

  const getHasGoogleTokens = useCallback(() => {
    return useAppSelector(selectHasGoogleTokens);
  }, []);

  return {
    // State
    events,
    loading,
    error,
    googleTokens,

    // Actions
    loadEvents,
    syncWithGoogle,

    // Selectors
    getEventById,
    getEventsCount,
    getHasEvents,
    getEventsByDate,
    getUpcomingEvents,
    getHasGoogleTokens,
  };
};
