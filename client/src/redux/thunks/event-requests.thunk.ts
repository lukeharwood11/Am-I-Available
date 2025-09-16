import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createEventRequest,
  getEventRequests,
  getEventRequestsWithApprovals,
  getEventRequest,
  getEventRequestWithApprovals,
  updateEventRequest,
  deleteEventRequest
} from '../hubs/event-requests.hub';
import {
  CreateEventRequestRequest,
  UpdateEventRequestRequest,
  GetEventRequestsRequest,
  ListEventRequestsWithApprovalsRequest
} from '../types/event-requests.types';
import { ERROR_MESSAGES } from '../constants';

// Create a new event request
export const createEventRequestThunk = createAsyncThunk(
  'eventRequests/create',
  async (request: CreateEventRequestRequest, { rejectWithValue }) => {
    try {
      const response = await createEventRequest(request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.CREATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch all event requests with filters
export const fetchEventRequestsThunk = createAsyncThunk(
  'eventRequests/fetchAll',
  async (params: GetEventRequestsRequest = {}, { rejectWithValue }) => {
    try {
      const response = await getEventRequests(params);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch event requests with approval status and pagination
export const fetchEventRequestsWithApprovalsThunk = createAsyncThunk(
  'eventRequests/fetchWithApprovals',
  async (params: ListEventRequestsWithApprovalsRequest = {}, { rejectWithValue }) => {
    try {
      const response = await getEventRequestsWithApprovals(params);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch a specific event request
export const fetchEventRequestThunk = createAsyncThunk(
  'eventRequests/fetchOne',
  async (eventRequestId: string, { rejectWithValue }) => {
    try {
      const response = await getEventRequest(eventRequestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch a specific event request with approval status
export const fetchEventRequestWithApprovalsThunk = createAsyncThunk(
  'eventRequests/fetchOneWithApprovals',
  async (eventRequestId: string, { rejectWithValue }) => {
    try {
      const response = await getEventRequestWithApprovals(eventRequestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Update an event request
export const updateEventRequestThunk = createAsyncThunk(
  'eventRequests/update',
  async (
    { eventRequestId, request }: { eventRequestId: string; request: Omit<UpdateEventRequestRequest, 'event_request_id'> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateEventRequest(eventRequestId, request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.UPDATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Delete an event request
export const deleteEventRequestThunk = createAsyncThunk(
  'eventRequests/delete',
  async (eventRequestId: string, { rejectWithValue }) => {
    try {
      const response = await deleteEventRequest(eventRequestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.EVENT_REQUESTS.DELETE_FAILED;
      return rejectWithValue(message);
    }
  }
);
