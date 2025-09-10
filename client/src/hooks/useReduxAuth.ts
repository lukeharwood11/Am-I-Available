import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  signOutUser, 
  refreshUserSession,
  storeGoogleTokens,
  getGoogleTokens
} from '../redux/thunks/auth.thunk';
import {
  selectSession,
  selectAuthLoading,
  selectIsAuthenticated,
  selectAccessToken,
  selectRefreshToken,
  selectAuthError,
} from '../redux/selectors/auth.selectors';

interface UseReduxAuthReturn {
  session: ReturnType<typeof selectSession>;
  loading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  storeGoogleAccessTokens: (
    googleAccessToken: string, 
    googleRefreshToken: string, 
    userId: string
  ) => Promise<void>;
  getGoogleAccessTokens: (userId: string) => Promise<void>;
}

export const useReduxAuth = (): UseReduxAuthReturn => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const session = useAppSelector(selectSession);
  const loading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const accessToken = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const error = useAppSelector(selectAuthError);

  // Actions
  const signOut = useCallback(async () => {
    await dispatch(signOutUser());
  }, [dispatch]);

  const refreshSession = useCallback(async () => {
    await dispatch(refreshUserSession());
  }, [dispatch]);

  const storeGoogleAccessTokens = useCallback(async (
    googleAccessToken: string,
    googleRefreshToken: string,
    userId: string
  ) => {
    await dispatch(storeGoogleTokens({
      googleAccessToken,
      googleRefreshToken,
      userId
    }));
  }, [dispatch]);

  const getGoogleAccessTokens = useCallback(async (userId: string) => {
    await dispatch(getGoogleTokens(userId));
  }, [dispatch]);

  return {
    session,
    loading,
    isAuthenticated,
    accessToken,
    refreshToken,
    error,
    signOut,
    refreshSession,
    storeGoogleAccessTokens,
    getGoogleAccessTokens,
  };
};
