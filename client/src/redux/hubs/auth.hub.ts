import { supabase } from '../../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import axiosInstance from '../../lib/axios';
import { HTTP_METHODS, CONTENT_TYPES } from '../constants';
import { store } from '../store';
import { selectAccessToken } from '../selectors/auth.selectors';
import { UserTokens, GetAccessTokensResponse } from '../types/auth.types';

interface RequestConfig {
  method?: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

// Helper function to make authenticated API requests
async function makeAuthenticatedRequest<T>(
  url: string, 
  config: RequestConfig = {}
): Promise<T> {
  const { 
    method = HTTP_METHODS.GET, 
    data, 
    params, 
    headers = {} 
  } = config;

  // Get current access token from Redux store
  const accessToken = selectAccessToken(store.getState());

  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': CONTENT_TYPES.JSON,
    ...headers,
  };

  // Add authorization header if access token is available
  if (accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      headers: requestHeaders,
    });

    return response.data;
  } catch (error: any) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || `HTTP Error: ${error.response.status}`);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
}

export async function get<T>(url: string, config?: Omit<RequestConfig, 'method' | 'data'>): Promise<T> {
  return makeAuthenticatedRequest<T>(url, { ...config, method: HTTP_METHODS.GET });
}

export async function post<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
  return makeAuthenticatedRequest<T>(url, { ...config, data, method: HTTP_METHODS.POST });
}

export async function put<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
  return makeAuthenticatedRequest<T>(url, { ...config, data, method: HTTP_METHODS.PUT });
}

export async function patch<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
  return makeAuthenticatedRequest<T>(url, { ...config, data, method: HTTP_METHODS.PATCH });
}

export async function del<T>(url: string, config?: Omit<RequestConfig, 'method' | 'data'>): Promise<T> {
  return makeAuthenticatedRequest<T>(url, { ...config, method: HTTP_METHODS.DELETE });
}

// Supabase Auth Methods
export async function getSession(): Promise<{ session: Session | null }> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    return {
      session,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    throw new Error('Failed to get session');
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
}

export async function refreshSession(): Promise<{ session: Session | null }> {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    
    return {
      session,
    };
  } catch (error) {
    console.error('Error refreshing session:', error);
    throw new Error('Failed to refresh session');
  }
}

// Google Tokens Methods
export async function storeAccessTokens(
  googleAccessToken: string,
  googleRefreshToken: string,
  userId: string
): Promise<UserTokens | null> {
  try {
    console.log('Storing Google tokens for user:', userId);
    
    const { data, error } = await supabase
      .from('user_tokens')
      .upsert({
        id: userId,
        google_access_token: googleAccessToken,
        google_refresh_token: googleRefreshToken,
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error storing access tokens:', error);
    return null;
  }
}

export async function getAccessTokens(userId: string): Promise<GetAccessTokensResponse | null> {
  try {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('google_access_token, google_refresh_token')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data as GetAccessTokensResponse;
  } catch (error) {
    console.error('Error getting access tokens:', error);
    return null;
  }
}

// Auth state subscription
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
