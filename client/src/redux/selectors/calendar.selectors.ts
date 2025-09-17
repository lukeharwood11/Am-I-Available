import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
export const selectCalendarState = (state: RootState) => state.calendar;

// Memoized selectors
export const selectCalendarEvents = createSelector(
  [selectCalendarState],
  calendar => calendar.events
);

export const selectCalendarLoading = createSelector(
  [selectCalendarState],
  calendar => calendar.loading
);

export const selectCalendarError = createSelector(
  [selectCalendarState],
  calendar => calendar.error
);

export const selectGoogleTokens = createSelector(
  [selectCalendarState],
  calendar => calendar.googleTokens
);

export const selectGoogleAccessToken = createSelector(
  [selectGoogleTokens],
  tokens => tokens.accessToken
);

export const selectGoogleRefreshToken = createSelector(
  [selectGoogleTokens],
  tokens => tokens.refreshToken
);

// Computed selectors
export const selectEventById = (id: string) =>
  createSelector([selectCalendarEvents], events =>
    events.find(event => event.id === id)
  );

export const selectEventsCount = createSelector(
  [selectCalendarEvents],
  events => events.length
);

export const selectHasEvents = createSelector(
  [selectCalendarEvents],
  events => events.length > 0
);

export const selectEventsByDate = (date: string) =>
  createSelector([selectCalendarEvents], events =>
    events.filter((event: any) => {
      const eventDate = event.start.date || event.start.dateTime?.split('T')[0];
      return eventDate === date;
    })
  );

export const selectUpcomingEvents = createSelector(
  [selectCalendarEvents],
  events => {
    const now = new Date();
    return events
      .filter((event: any) => {
        const eventDateTime = new Date(
          event.start.dateTime || event.start.date || ''
        );
        return eventDateTime > now;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.start.dateTime || a.start.date || '');
        const dateB = new Date(b.start.dateTime || b.start.date || '');
        return dateA.getTime() - dateB.getTime();
      });
  }
);

export const selectHasGoogleTokens = createSelector(
  [selectGoogleTokens],
  tokens => !!(tokens.accessToken && tokens.refreshToken)
);
