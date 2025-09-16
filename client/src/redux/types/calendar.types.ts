// Calendar State Types
export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  description?: string;
  location?: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  googleTokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}
