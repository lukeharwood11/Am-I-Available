import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSession, signOut, refreshSession, storeAccessTokens, getAccessTokens } from '../hubs/auth.hub';
import { authActions } from '../slices/auth.slice';
import { ERROR_MESSAGES } from '../constants';

// Initialize auth state
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { session, user } = await getSession();
      dispatch(authActions.setSession({ session, user }));
      return { session, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.AUTH.LOGIN_FAILED;
      dispatch(authActions.setAuthError(message));
      return rejectWithValue(message);
    }
  }
);

// Sign out user
export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut();
      dispatch(authActions.clearAuth());
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.AUTH.LOGOUT_FAILED;
      dispatch(authActions.setAuthError(message));
      return rejectWithValue(message);
    }
  }
);

// Refresh session
export const refreshUserSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { session, user } = await refreshSession();
      dispatch(authActions.setSession({ session, user }));
      return { session, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.AUTH.TOKEN_REFRESH_FAILED;
      dispatch(authActions.setAuthError(message));
      dispatch(authActions.clearAuth());
      return rejectWithValue(message);
    }
  }
);

// Store Google access tokens
export const storeGoogleTokens = createAsyncThunk(
  'auth/storeGoogleTokens',
  async (
    { 
      googleAccessToken, 
      googleRefreshToken, 
      userId 
    }: { 
      googleAccessToken: string; 
      googleRefreshToken: string; 
      userId: string; 
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await storeAccessTokens(
        googleAccessToken,
        googleRefreshToken,
        userId
      );
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to store Google tokens';
      return rejectWithValue(message);
    }
  }
);

// Get Google access tokens
export const getGoogleTokens = createAsyncThunk(
  'auth/getGoogleTokens',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await getAccessTokens(userId);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get Google tokens';
      return rejectWithValue(message);
    }
  }
);
