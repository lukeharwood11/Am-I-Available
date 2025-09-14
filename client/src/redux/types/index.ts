import { Session } from '@supabase/supabase-js';
import { Recipe } from '../../types/recipe';

export * from './relationships.types';

// Auth State Types
export interface AuthState {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

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

// Recipe State Types
export interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  searchResults: Recipe[];
  searchLoading: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Request State Types
export interface RequestState {
  loading: boolean;
  error: string | null;
}
