import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RelationshipState } from '../types/relationships.types';
import { RelationshipData } from '../hubs/relationships.hub';
import { RelationshipRequestData } from '../hubs/relationship-requests.hub';
import {
  createRelationshipThunk,
  fetchUserRelationshipsThunk,
  fetchRelationshipThunk,
  updateRelationshipThunk,
  deleteRelationshipThunk,
  approveRelationshipThunk,
  rejectRelationshipThunk,
} from '../thunks/relationships.thunk';
import {
  createRelationshipRequestThunk,
  fetchSentRelationshipRequestsThunk,
  fetchReceivedRelationshipRequestsThunk,
  fetchRelationshipRequestThunk,
  updateRelationshipRequestThunk,
  deleteRelationshipRequestThunk,
  approveRelationshipRequestThunk,
  rejectRelationshipRequestThunk,
} from '../thunks/relationship-requests.thunk';

const initialState: RelationshipState = {
  relationships: [],
  relationshipRequests: {
    sent: [],
    received: [],
  },
  currentRelationship: null,
  currentRelationshipRequest: null,
  loading: false,
  error: null,
};

const relationshipSlice = createSlice({
  name: 'relationships',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRelationships: (state, action: PayloadAction<RelationshipData[]>) => {
      state.relationships = action.payload;
    },
    setSentRelationshipRequests: (state, action: PayloadAction<RelationshipRequestData[]>) => {
      state.relationshipRequests.sent = action.payload;
    },
    setReceivedRelationshipRequests: (state, action: PayloadAction<RelationshipRequestData[]>) => {
      state.relationshipRequests.received = action.payload;
    },
    setCurrentRelationship: (state, action: PayloadAction<RelationshipData | null>) => {
      state.currentRelationship = action.payload;
    },
    setCurrentRelationshipRequest: (state, action: PayloadAction<RelationshipRequestData | null>) => {
      state.currentRelationshipRequest = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generic pending handlers
      .addCase(createRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRelationshipsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRelationshipThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentRelationshipRequestsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedRelationshipRequestsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRelationshipRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Generic rejected handlers
      .addCase(createRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserRelationshipsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(rejectRelationshipThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSentRelationshipRequestsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReceivedRelationshipRequestsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(rejectRelationshipRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fulfilled handlers with data updates
      .addCase(createRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationships.push(action.payload.relationship);
      })
      .addCase(fetchUserRelationshipsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationships = action.payload.relationships;
      })
      .addCase(fetchRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRelationship = action.payload.relationship;
      })
      .addCase(updateRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.relationships.findIndex(r => r.id === action.payload.relationship.id);
        if (index !== -1) {
          state.relationships[index] = action.payload.relationship;
        }
        if (state.currentRelationship?.id === action.payload.relationship.id) {
          state.currentRelationship = action.payload.relationship;
        }
      })
      .addCase(deleteRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationships = state.relationships.filter(r => r.id !== action.meta.arg);
        if (state.currentRelationship?.id === action.meta.arg) {
          state.currentRelationship = null;
        }
      })
      .addCase(approveRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.relationships.findIndex(r => r.id === action.payload.relationship.id);
        if (index !== -1) {
          state.relationships[index] = action.payload.relationship;
        }
      })
      .addCase(rejectRelationshipThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.relationships.findIndex(r => r.id === action.payload.relationship.id);
        if (index !== -1) {
          state.relationships[index] = action.payload.relationship;
        }
      })
      .addCase(createRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationshipRequests.sent.push(action.payload.relationship_request);
      })
      .addCase(fetchSentRelationshipRequestsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationshipRequests.sent = action.payload.relationship_requests;
      })
      .addCase(fetchReceivedRelationshipRequestsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.relationshipRequests.received = action.payload.relationship_requests;
      })
      .addCase(fetchRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRelationshipRequest = action.payload.relationship_request;
      })
      .addCase(updateRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        const sentIndex = state.relationshipRequests.sent.findIndex(r => r.id === action.payload.relationship_request.id);
        if (sentIndex !== -1) {
          state.relationshipRequests.sent[sentIndex] = action.payload.relationship_request;
        }
        const receivedIndex = state.relationshipRequests.received.findIndex(r => r.id === action.payload.relationship_request.id);
        if (receivedIndex !== -1) {
          state.relationshipRequests.received[receivedIndex] = action.payload.relationship_request;
        }
        if (state.currentRelationshipRequest?.id === action.payload.relationship_request.id) {
          state.currentRelationshipRequest = action.payload.relationship_request;
        }
      })
      .addCase(deleteRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        const requestId = action.meta.arg;
        state.relationshipRequests.sent = state.relationshipRequests.sent.filter(r => r.id !== requestId);
        state.relationshipRequests.received = state.relationshipRequests.received.filter(r => r.id !== requestId);
        if (state.currentRelationshipRequest?.id === requestId) {
          state.currentRelationshipRequest = null;
        }
      })
      .addCase(approveRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.relationshipRequests.received.findIndex(r => r.id === action.payload.relationship_request.id);
        if (index !== -1) {
          state.relationshipRequests.received[index] = action.payload.relationship_request;
        }
      })
      .addCase(rejectRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.relationshipRequests.received.findIndex(r => r.id === action.payload.relationship_request.id);
        if (index !== -1) {
          state.relationshipRequests.received[index] = action.payload.relationship_request;
        }
      });
  },
});

export const actions = { ...relationshipSlice.actions };

export default relationshipSlice.reducer;
