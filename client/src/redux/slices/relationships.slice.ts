import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RelationshipWithUserData } from '../types/relationships.types';
import {
  RelationshipRequestData,
  RelationshipRequestWithUserData,
} from '../types/relationship-requests.types';
import {
  createRelationshipThunk,
  fetchUserRelationshipsThunk,
  fetchRelationshipThunk,
  updateRelationshipThunk,
  deleteRelationshipThunk,
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

export interface RelationshipState {
  relationships: RelationshipWithUserData[];
  relationshipRequests: {
    sent: RelationshipRequestData[];
    received: RelationshipRequestWithUserData[];
  };
  currentRelationship: RelationshipWithUserData | null;
  currentRelationshipRequest: RelationshipRequestData | null;
  pagination: {
    skip: number;
    take: number;
    total_count: number;
  };
  loading: {
    relationships: boolean;
    relationshipRequests: boolean;
    currentRelationship: boolean;
    currentRelationshipRequest: boolean;
  };
  error: {
    relationships: string | null;
    relationshipRequests: string | null;
    currentRelationship: string | null;
    currentRelationshipRequest: string | null;
  };
}


const initialState: RelationshipState = {
  relationships: [],
  relationshipRequests: {
    sent: [],
    received: [],
  },
  currentRelationship: null,
  currentRelationshipRequest: null,
  pagination: {
    skip: 0,
    take: 10,
    total_count: 0,
  },
  loading: {
    relationships: false,
    relationshipRequests: false,
    currentRelationship: false,
    currentRelationshipRequest: false,
  },
  error: {
    relationships: null,
    relationshipRequests: null,
    currentRelationship: null,
    currentRelationshipRequest: null,
  },
};

const relationshipSlice = createSlice({
  name: 'relationships',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ key: keyof RelationshipState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setError: (state, action: PayloadAction<{ key: keyof RelationshipState['error']; value: string | null }>) => {
      state.error[action.payload.key] = action.payload.value;
    },
    setRelationships: (
      state,
      action: PayloadAction<RelationshipWithUserData[]>
    ) => {
      state.relationships = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{ skip: number; take: number; total_count: number }>
    ) => {
      state.pagination = action.payload;
    },
    setSentRelationshipRequests: (
      state,
      action: PayloadAction<RelationshipRequestData[]>
    ) => {
      state.relationshipRequests.sent = action.payload;
    },
    setReceivedRelationshipRequests: (
      state,
      action: PayloadAction<RelationshipRequestWithUserData[]>
    ) => {
      state.relationshipRequests.received = action.payload;
    },
    setCurrentRelationship: (
      state,
      action: PayloadAction<RelationshipWithUserData | null>
    ) => {
      state.currentRelationship = action.payload;
    },
    setCurrentRelationshipRequest: (
      state,
      action: PayloadAction<RelationshipRequestData | null>
    ) => {
      state.currentRelationshipRequest = action.payload;
    },
    clearError: (state, action: PayloadAction<keyof RelationshipState['error']>) => {
      state.error[action.payload] = null;
    },
    clearAllErrors: state => {
      state.error = {
        relationships: null,
        relationshipRequests: null,
        currentRelationship: null,
        currentRelationshipRequest: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Generic pending handlers
      .addCase(createRelationshipThunk.pending, state => {
        state.loading.relationships = true;
        state.error.relationships = null;
      })
      .addCase(fetchUserRelationshipsThunk.pending, state => {
        state.loading.relationships = true;
        state.error.relationships = null;
      })
      .addCase(fetchRelationshipThunk.pending, state => {
        state.loading.currentRelationship = true;
        state.error.currentRelationship = null;
      })
      .addCase(updateRelationshipThunk.pending, state => {
        state.loading.relationships = true;
        state.error.relationships = null;
      })
      .addCase(deleteRelationshipThunk.pending, state => {
        state.loading.relationships = true;
        state.error.relationships = null;
      })
      .addCase(createRelationshipRequestThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(fetchSentRelationshipRequestsThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(fetchReceivedRelationshipRequestsThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(fetchRelationshipRequestThunk.pending, state => {
        state.loading.currentRelationshipRequest = true;
        state.error.currentRelationshipRequest = null;
      })
      .addCase(updateRelationshipRequestThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(deleteRelationshipRequestThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(approveRelationshipRequestThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      .addCase(rejectRelationshipRequestThunk.pending, state => {
        state.loading.relationshipRequests = true;
        state.error.relationshipRequests = null;
      })
      // Generic rejected handlers
      .addCase(createRelationshipThunk.rejected, (state, action) => {
        state.loading.relationships = false;
        state.error.relationships = action.payload as string;
      })
      .addCase(fetchUserRelationshipsThunk.rejected, (state, action) => {
        state.loading.relationships = false;
        state.error.relationships = action.payload as string;
      })
      .addCase(fetchRelationshipThunk.rejected, (state, action) => {
        state.loading.currentRelationship = false;
        state.error.currentRelationship = action.payload as string;
      })
      .addCase(updateRelationshipThunk.rejected, (state, action) => {
        state.loading.relationships = false;
        state.error.relationships = action.payload as string;
      })
      .addCase(deleteRelationshipThunk.rejected, (state, action) => {
        state.loading.relationships = false;
        state.error.relationships = action.payload as string;
      })
      .addCase(createRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      .addCase(fetchSentRelationshipRequestsThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      .addCase(
        fetchReceivedRelationshipRequestsThunk.rejected,
        (state, action) => {
          state.loading.relationshipRequests = false;
          state.error.relationshipRequests = action.payload as string;
        }
      )
      .addCase(fetchRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.currentRelationshipRequest = false;
        state.error.currentRelationshipRequest = action.payload as string;
      })
      .addCase(updateRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      .addCase(deleteRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      .addCase(approveRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      .addCase(rejectRelationshipRequestThunk.rejected, (state, action) => {
        state.loading.relationshipRequests = false;
        state.error.relationshipRequests = action.payload as string;
      })
      // Fulfilled handlers with data updates
      .addCase(createRelationshipThunk.fulfilled, state => {
        state.loading.relationships = false;
        // Note: Create response returns basic RelationshipData, would need to refetch to get user data
        // For now, we'll just refetch the relationships list
      })
      .addCase(fetchUserRelationshipsThunk.fulfilled, (state, action) => {
        state.loading.relationships = false;
        state.relationships = action.payload.relationships;
        state.pagination = {
          skip: action.payload.skip,
          take: action.payload.take,
          total_count: action.payload.total_count,
        };
      })
      .addCase(fetchRelationshipThunk.fulfilled, (state, action) => {
        state.loading.currentRelationship = false;
        state.currentRelationship = action.payload.relationship;
      })
      .addCase(updateRelationshipThunk.fulfilled, state => {
        state.loading.relationships = false;
        // Note: Update response returns basic RelationshipData, would need to refetch to get user data
        // For now, we'll just mark that a refetch is needed
      })
      .addCase(deleteRelationshipThunk.fulfilled, (state, action) => {
        state.loading.relationships = false;
        state.relationships = state.relationships.filter(
          (r: RelationshipWithUserData) => r.id !== action.meta.arg
        );
        if (state.currentRelationship?.id === action.meta.arg) {
          state.currentRelationship = null;
        }
      })
      .addCase(createRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.relationshipRequests = false;
        state.relationshipRequests.sent.push(
          action.payload.relationship_request
        );
      })
      .addCase(
        fetchSentRelationshipRequestsThunk.fulfilled,
        (state, action) => {
          state.loading.relationshipRequests = false;
          state.relationshipRequests.sent =
            action.payload.relationship_requests;
        }
      )
      .addCase(
        fetchReceivedRelationshipRequestsThunk.fulfilled,
        (state, action) => {
          state.loading.relationshipRequests = false;
          state.relationshipRequests.received =
            action.payload.relationship_requests;
        }
      )
      .addCase(fetchRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.currentRelationshipRequest = false;
        state.currentRelationshipRequest = action.payload.relationship_request;
      })
      .addCase(updateRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.relationshipRequests = false;
        const sentIndex = state.relationshipRequests.sent.findIndex(
          (r: RelationshipRequestData) => r.id === action.payload.relationship_request.id
        );
        if (sentIndex !== -1) {
          state.relationshipRequests.sent[sentIndex] =
            action.payload.relationship_request;
        }
        if (
          state.currentRelationshipRequest?.id ===
          action.payload.relationship_request.id
        ) {
          state.currentRelationshipRequest =
            action.payload.relationship_request;
        }
      })
      .addCase(deleteRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.relationshipRequests = false;
        const requestId = action.meta.arg;
        state.relationshipRequests.sent =
          state.relationshipRequests.sent.filter((r: RelationshipRequestData) => r.id !== requestId);
        state.relationshipRequests.received =
          state.relationshipRequests.received.filter((r: RelationshipRequestWithUserData) => r.id !== requestId);
        if (state.currentRelationshipRequest?.id === requestId) {
          state.currentRelationshipRequest = null;
        }
      })
      .addCase(approveRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.relationshipRequests = false;
        state.relationshipRequests.received =
          state.relationshipRequests.received.filter(
            (r: RelationshipRequestWithUserData) => r.id !== action.payload.relationship_request.id
          );
      })
      .addCase(rejectRelationshipRequestThunk.fulfilled, (state, action) => {
        state.loading.relationshipRequests = false;
        state.relationshipRequests.received =
          state.relationshipRequests.received.filter(
            (r: RelationshipRequestWithUserData) => r.id !== action.payload.relationship_request.id
          );
      });
  },
});

export const actions = { ...relationshipSlice.actions };

export default relationshipSlice.reducer;
