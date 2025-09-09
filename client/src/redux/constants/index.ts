export * from './api.constants';

// Action Status Constants
export const ACTION_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  AUTH: {
    LOGIN_FAILED: 'Login failed. Please try again.',
    LOGOUT_FAILED: 'Logout failed. Please try again.',
    TOKEN_REFRESH_FAILED: 'Session expired. Please login again.',
    UNAUTHORIZED: 'Unauthorized access. Please login.',
  },
  RECIPE: {
    FETCH_FAILED: 'Failed to fetch recipes.',
    CREATE_FAILED: 'Failed to create recipe.',
    UPDATE_FAILED: 'Failed to update recipe.',
    DELETE_FAILED: 'Failed to delete recipe.',
    SEARCH_FAILED: 'Failed to search recipes.',
  },
  CALENDAR: {
    FETCH_EVENTS_FAILED: 'Failed to fetch calendar events.',
    SYNC_FAILED: 'Failed to sync with Google Calendar.',
  },
  NETWORK: {
    CONNECTION_ERROR: 'Network connection error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT: 'Request timeout. Please try again.',
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
} as const;
