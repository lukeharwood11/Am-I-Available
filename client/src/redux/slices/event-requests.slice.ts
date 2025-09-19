import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EventRequestsState,
  EventRequestData,
  EventRequestWithApprovalsData,
} from '../types/event-requests.types';
import {
  createEventRequestThunk,
  fetchEventRequestsThunk,
  fetchEventRequestsWithApprovalsThunk,
  fetchEventRequestThunk,
  fetchEventRequestWithApprovalsThunk,
  updateEventRequestThunk,
  deleteEventRequestThunk,
} from '../thunks/event-requests.thunk';

const initialState: EventRequestsState = {
  eventRequests: [],
  eventRequestsWithApprovals: [],
  currentEventRequest: null,
  currentEventRequestWithApprovals: null,
  pagination: {
    skip: 0,
    take: 10,
    total_count: 0,
  },
  loading: {
    eventRequests: false,
    eventRequestsWithApprovals: false,
    currentEventRequest: false,
    currentEventRequestWithApprovals: false,
  },
  error: {
    eventRequests: null,
    eventRequestsWithApprovals: null,
    currentEventRequest: null,
    currentEventRequestWithApprovals: null,
  },
};

const eventRequestsSlice = createSlice({
  name: 'eventRequests',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ key: keyof EventRequestsState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setError: (state, action: PayloadAction<{ key: keyof EventRequestsState['error']; value: string | null }>) => {
      state.error[action.payload.key] = action.payload.value;
    },
    setEventRequests: (state, action: PayloadAction<EventRequestData[]>) => {
      state.eventRequests = action.payload;
    },
    setEventRequestsWithApprovals: (
      state,
      action: PayloadAction<EventRequestWithApprovalsData[]>
    ) => {
      state.eventRequestsWithApprovals = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{ skip: number; take: number; total_count: number }>
    ) => {
      state.pagination = action.payload;
    },
    setCurrentEventRequest: (
      state,
      action: PayloadAction<EventRequestData | null>
    ) => {
      state.currentEventRequest = action.payload;
    },
    setCurrentEventRequestWithApprovals: (
      state,
      action: PayloadAction<EventRequestWithApprovalsData | null>
    ) => {
      state.currentEventRequestWithApprovals = action.payload;
    },
    clearError: (state, action: PayloadAction<keyof EventRequestsState['error']>) => {
      state.error[action.payload] = null;
    },
    clearAllErrors: state => {
      state.error = {
        eventRequests: null,
        eventRequestsWithApprovals: null,
        currentEventRequest: null,
        currentEventRequestWithApprovals: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Generic pending handlers
      .addCase(createEventRequestThunk.pending, state => {
        state.loading.eventRequests = true;
        state.error.eventRequests = null;
      })
      .addCase(fetchEventRequestsThunk.pending, state => {
        state.loading.eventRequests = true;
        state.error.eventRequests = null;
      })
      .addCase(fetchEventRequestsWithApprovalsThunk.pending, state => {
        state.loading.eventRequestsWithApprovals = true;
        state.error.eventRequestsWithApprovals = null;
      })
      .addCase(fetchEventRequestThunk.pending, state => {
        state.loading.currentEventRequest = true;
        state.error.currentEventRequest = null;
      })
      .addCase(fetchEventRequestWithApprovalsThunk.pending, state => {
        state.loading.currentEventRequestWithApprovals = true;
        state.error.currentEventRequestWithApprovals = null;
      })
      .addCase(updateEventRequestThunk.pending, state => {
        state.loading.eventRequests = true;
        state.error.eventRequests = null;
      })
      .addCase(deleteEventRequestThunk.pending, state => {
        state.loading.eventRequests = true;
        state.error.eventRequests = null;
      })
      // Generic rejected handlers
      .addCase(createEventRequestThunk.rejected, (state, action) => {
        state.loading.eventRequests = false;
        state.error.eventRequests = action.payload as string;
      })
      .addCase(fetchEventRequestsThunk.rejected, (state, action) => {
        state.loading.eventRequests = false;
        state.error.eventRequests = action.payload as string;
      })
      .addCase(
        fetchEventRequestsWithApprovalsThunk.rejected,
        (state, action) => {
          state.loading.eventRequestsWithApprovals = false;
          state.error.eventRequestsWithApprovals = action.payload as string;
        }
      )
      .addCase(fetchEventRequestThunk.rejected, (state, action) => {
        state.loading.currentEventRequest = false;
        state.error.currentEventRequest = action.payload as string;
      })
      .addCase(
        fetchEventRequestWithApprovalsThunk.rejected,
        (state, action) => {
          state.loading.currentEventRequestWithApprovals = false;
          state.error.currentEventRequestWithApprovals = action.payload as string;
        }
      )
      .addCase(updateEventRequestThunk.rejected, (state, action) => {
        state.loading.eventRequests = false;
        state.error.eventRequests = action.payload as string;
      })
      .addCase(deleteEventRequestThunk.rejected, (state, action) => {
        state.loading.eventRequests = false;
        state.error.eventRequests = action.payload as string;
      })
      // Fulfilled handlers with data updates
      .addCase(createEventRequestThunk.fulfilled, (state, action) => {
        state.loading.eventRequests = false;
        state.eventRequests.push(action.payload.event_request);
      })
      .addCase(fetchEventRequestsThunk.fulfilled, (state, action) => {
        state.loading.eventRequests = false;
        state.eventRequests = action.payload.event_requests;
      })
      .addCase(
        fetchEventRequestsWithApprovalsThunk.fulfilled,
        (state, action) => {
          state.loading.eventRequestsWithApprovals = false;
          state.eventRequestsWithApprovals = action.payload.event_requests;
          state.pagination = {
            skip: action.payload.skip,
            take: action.payload.take,
            total_count: action.payload.total_count,
          };
        }
      )
      .addCase(fetchEventRequestThunk.fulfilled, (state, action) => {
        state.loading.currentEventRequest = false;
        state.currentEventRequest = action.payload.event_request;
      })
      .addCase(
        fetchEventRequestWithApprovalsThunk.fulfilled,
        (state, action) => {
          state.loading.currentEventRequestWithApprovals = false;
          state.currentEventRequestWithApprovals = action.payload.event_request;
        }
      )
      .addCase(updateEventRequestThunk.fulfilled, (state, action) => {
        state.loading.eventRequests = false;
        const updatedRequest = action.payload.event_request;

        // Update in eventRequests array
        const eventRequestIndex = state.eventRequests.findIndex(
          r => r.id === updatedRequest.id
        );
        if (eventRequestIndex !== -1) {
          state.eventRequests[eventRequestIndex] = updatedRequest;
        }

        // Update in eventRequestsWithApprovals array
        const eventRequestWithApprovalsIndex =
          state.eventRequestsWithApprovals.findIndex(
            r => r.id === updatedRequest.id
          );
        if (eventRequestWithApprovalsIndex !== -1) {
          // Update the basic fields, keeping the approval-specific fields
          const existingWithApprovals =
            state.eventRequestsWithApprovals[eventRequestWithApprovalsIndex];
          if (existingWithApprovals) {
            state.eventRequestsWithApprovals[eventRequestWithApprovalsIndex] = {
              ...existingWithApprovals,
              ...updatedRequest,
              // Ensure approval-specific fields are preserved
              approval_status: existingWithApprovals.approval_status,
              requested_approvals: existingWithApprovals.requested_approvals,
              completed_count: existingWithApprovals.completed_count,
            };
          }
        }

        // Update current event request if it matches
        if (state.currentEventRequest?.id === updatedRequest.id) {
          state.currentEventRequest = updatedRequest;
        }
      })
      .addCase(deleteEventRequestThunk.fulfilled, (state, action) => {
        state.loading.eventRequests = false;
        const requestId = action.meta.arg;

        // Remove from eventRequests array
        state.eventRequests = state.eventRequests.filter(
          r => r.id !== requestId
        );

        // Remove from eventRequestsWithApprovals array
        state.eventRequestsWithApprovals =
          state.eventRequestsWithApprovals.filter(r => r.id !== requestId);

        // Clear current event request if it matches
        if (state.currentEventRequest?.id === requestId) {
          state.currentEventRequest = null;
        }
        if (state.currentEventRequestWithApprovals?.id === requestId) {
          state.currentEventRequestWithApprovals = null;
        }
      });
  },
});

export const actions = { ...eventRequestsSlice.actions };

export default eventRequestsSlice.reducer;
