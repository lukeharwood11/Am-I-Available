import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createRelationship,
  getUserRelationships,
  getRelationship,
  updateRelationship,
  deleteRelationship,
  approveRelationship,
  rejectRelationship,
  CreateRelationshipRequest,
  UpdateRelationshipRequest
} from '../hubs/relationships.hub';
import { ERROR_MESSAGES } from '../constants';

// Create a new relationship
export const createRelationshipThunk = createAsyncThunk(
  'relationships/create',
  async (request: CreateRelationshipRequest, { rejectWithValue }) => {
    try {
      const response = await createRelationship(request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.CREATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch all user relationships
export const fetchUserRelationshipsThunk = createAsyncThunk(
  'relationships/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserRelationships();
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Fetch a specific relationship
export const fetchRelationshipThunk = createAsyncThunk(
  'relationships/fetchOne',
  async (relationshipId: string, { rejectWithValue }) => {
    try {
      const response = await getRelationship(relationshipId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.FETCH_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Update a relationship
export const updateRelationshipThunk = createAsyncThunk(
  'relationships/update',
  async (
    { relationshipId, request }: { relationshipId: string; request: UpdateRelationshipRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateRelationship(relationshipId, request);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.UPDATE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Delete a relationship
export const deleteRelationshipThunk = createAsyncThunk(
  'relationships/delete',
  async (relationshipId: string, { rejectWithValue }) => {
    try {
      const response = await deleteRelationship(relationshipId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.DELETE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Approve a relationship
export const approveRelationshipThunk = createAsyncThunk(
  'relationships/approve',
  async (relationshipId: string, { rejectWithValue }) => {
    try {
      const response = await approveRelationship(relationshipId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.APPROVE_FAILED;
      return rejectWithValue(message);
    }
  }
);

// Reject a relationship
export const rejectRelationshipThunk = createAsyncThunk(
  'relationships/reject',
  async (relationshipId: string, { rejectWithValue }) => {
    try {
      const response = await rejectRelationship(relationshipId);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.RELATIONSHIPS.REJECT_FAILED;
      return rejectWithValue(message);
    }
  }
);
