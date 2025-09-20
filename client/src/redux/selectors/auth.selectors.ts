import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
export const selectAuthState = (state: RootState) => state.auth;

export const selectSession = createSelector(
    [selectAuthState],
    auth => auth.session
);

export const selectIsAuthenticated = createSelector(
    [selectAuthState],
    auth => auth.isAuthenticated
);

export const selectAuthLoading = createSelector(
    [selectAuthState],
    auth => auth.loading
);

export const selectAuthError = createSelector(
    [selectAuthState],
    auth => auth.error
);

export const selectAccessToken = createSelector(
    [selectAuthState],
    auth => auth.accessToken
);

export const selectRefreshToken = createSelector(
    [selectAuthState],
    auth => auth.refreshToken
);
