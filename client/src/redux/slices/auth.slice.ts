import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Session } from '@supabase/supabase-js';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSession: (state, action: PayloadAction<{ session: Session | null; user: User | null }>) => {
      const { session, user } = action.payload;
      state.session = session;
      state.user = user;
      state.isAuthenticated = !!session;
      state.accessToken = session?.access_token ?? null;
      state.refreshToken = session?.refresh_token ?? null;
      state.loading = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const authActions = { ...authSlice.actions };

export default authSlice.reducer;
