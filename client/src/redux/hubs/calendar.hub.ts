import { CalendarEvent } from '../types/calendar.types';
import { get, post } from './auth.hub';

export async function getEvents(): Promise<CalendarEvent[]> {
  try {
    // This would connect to your calendar API endpoints
    // For now, returning empty array as placeholder
    const response = await get<{ data: CalendarEvent[] }>(
      '/api/v1/calendar/events'
    );
    return response.data || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw new Error('Failed to fetch calendar events');
  }
}

export async function syncWithGoogle(googleTokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<CalendarEvent[]> {
  try {
    // This would sync with Google Calendar API
    const response = await post<{ data: CalendarEvent[] }>(
      '/api/v1/calendar/sync',
      googleTokens
    );
    return response.data || [];
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    throw new Error('Failed to sync with Google Calendar');
  }
}
