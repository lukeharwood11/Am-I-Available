import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createRelationshipRequest,
  getSentRelationshipRequests,
  getReceivedRelationshipRequests,
  getRelationshipRequest,
  updateRelationshipRequest,
  deleteRelationshipRequest,
  approveRelationshipRequest,
  rejectRelationshipRequest
} from '../hubs/relationship-requests.hub';
import {
  CreateRelationshipRequestRequest,
  UpdateRelationshipRequestRequest
} from '../types/relationship-requests.types';
import { ERROR_MESSAGES } from '../constants';

// Create a new relationship request
export const createRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/create',
  async (request: CreateRelationshipRequestRequest, { rejectWithValue }) => {
    try {
      const response = await createRelationshipRequest(request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.CREATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch sent relationship requests
export const fetchSentRelationshipRequestsThunk = createAsyncThunk(
  'relationshipRequests/fetchSent',
  async (status: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getSentRelationshipRequests(status);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch received relationship requests
export const fetchReceivedRelationshipRequestsThunk = createAsyncThunk(
  'relationshipRequests/fetchReceived',
  async (status: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getReceivedRelationshipRequests(status);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch a specific relationship request
export const fetchRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/fetchOne',
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await getRelationshipRequest(requestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Update a relationship request
export const updateRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/update',
  async (
    { requestId, request }: { requestId: string; request: UpdateRelationshipRequestRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateRelationshipRequest(requestId, request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.UPDATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Delete a relationship request
export const deleteRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/delete',
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await deleteRelationshipRequest(requestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.DELETE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Approve a relationship request
export const approveRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/approve',
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await approveRelationshipRequest(requestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.APPROVE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Reject a relationship request
export const rejectRelationshipRequestThunk = createAsyncThunk(
  'relationshipRequests/reject',
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await rejectRelationshipRequest(requestId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIP_REQUESTS.REJECT_FAILED;
      return rejectWithValue(message);
    }
  }
);
