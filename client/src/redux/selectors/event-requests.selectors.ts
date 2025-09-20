import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Basic selectors
export const selectEventRequestsState = (state: RootState) =>
    state.eventRequests;

export const selectEventRequests = (state: RootState) =>
    state.eventRequests.eventRequests;

export const selectEventRequestsWithApprovals = (state: RootState) =>
    state.eventRequests.eventRequestsWithApprovals;

export const selectCurrentEventRequest = (state: RootState) =>
    state.eventRequests.currentEventRequest;

export const selectCurrentEventRequestWithApprovals = (state: RootState) =>
    state.eventRequests.currentEventRequestWithApprovals;

export const selectEventRequestsLoading = (state: RootState) =>
    state.eventRequests.loading;

export const selectEventRequestsError = (state: RootState) =>
    state.eventRequests.error;

export const selectEventRequestsPagination = (state: RootState) =>
    state.eventRequests.pagination;

// Computed selectors
export const selectEventRequestsByStatus = createSelector(
    [selectEventRequests, (_: RootState, status: string) => status],
    (eventRequests, status) =>
        eventRequests.filter(request => request.status === status)
);

export const selectEventRequestsWithApprovalsByStatus = createSelector(
    [
        selectEventRequestsWithApprovals,
        (_: RootState, status: string) => status,
    ],
    (eventRequestsWithApprovals, status) =>
        eventRequestsWithApprovals.filter(request => request.status === status)
);

export const selectEventRequestsByImportanceLevel = createSelector(
    [
        selectEventRequests,
        (_: RootState, importanceLevel: number) => importanceLevel,
    ],
    (eventRequests, importanceLevel) =>
        eventRequests.filter(
            request => request.importance_level === importanceLevel
        )
);

export const selectEventRequestsWithApprovalsByImportanceLevel = createSelector(
    [
        selectEventRequestsWithApprovals,
        (_: RootState, importanceLevel: number) => importanceLevel,
    ],
    (eventRequestsWithApprovals, importanceLevel) =>
        eventRequestsWithApprovals.filter(
            request => request.importance_level === importanceLevel
        )
);

export const selectEventRequestsByApprovalStatus = createSelector(
    [
        selectEventRequestsWithApprovals,
        (_: RootState, approvalStatus: string) => approvalStatus,
    ],
    (eventRequestsWithApprovals, approvalStatus) =>
        eventRequestsWithApprovals.filter(
            request => request.approval_status === approvalStatus
        )
);

export const selectPendingEventRequests = createSelector(
    [selectEventRequests],
    eventRequests =>
        eventRequests.filter(request => request.status === 'pending')
);

export const selectApprovedEventRequests = createSelector(
    [selectEventRequests],
    eventRequests =>
        eventRequests.filter(request => request.status === 'approved')
);

export const selectRejectedEventRequests = createSelector(
    [selectEventRequests],
    eventRequests =>
        eventRequests.filter(request => request.status === 'rejected')
);

export const selectPendingEventRequestsWithApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.status === 'pending'
        )
);

export const selectApprovedEventRequestsWithApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.status === 'approved'
        )
);

export const selectRejectedEventRequestsWithApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.status === 'rejected'
        )
);

export const selectEventRequestsWithPendingApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.approval_status === 'pending'
        )
);

export const selectEventRequestsWithApprovedApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.approval_status === 'approved'
        )
);

export const selectEventRequestsWithRejectedApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.approval_status === 'rejected'
        )
);

export const selectEventRequestsWithNoApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.approval_status === 'no_approvals'
        )
);

// High importance event requests (importance level 4 or 5)
export const selectHighImportanceEventRequests = createSelector(
    [selectEventRequests],
    eventRequests =>
        eventRequests.filter(request => request.importance_level >= 4)
);

export const selectHighImportanceEventRequestsWithApprovals = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals =>
        eventRequestsWithApprovals.filter(
            request => request.importance_level >= 4
        )
);

// Event requests count selectors
export const selectEventRequestsCount = createSelector(
    [selectEventRequests],
    eventRequests => eventRequests.length
);

export const selectEventRequestsWithApprovalsCount = createSelector(
    [selectEventRequestsWithApprovals],
    eventRequestsWithApprovals => eventRequestsWithApprovals.length
);

export const selectPendingEventRequestsCount = createSelector(
    [selectPendingEventRequests],
    pendingRequests => pendingRequests.length
);

export const selectApprovedEventRequestsCount = createSelector(
    [selectApprovedEventRequests],
    approvedRequests => approvedRequests.length
);

export const selectRejectedEventRequestsCount = createSelector(
    [selectRejectedEventRequests],
    rejectedRequests => rejectedRequests.length
);

export const selectHighImportanceEventRequestsCount = createSelector(
    [selectHighImportanceEventRequests],
    highImportanceRequests => highImportanceRequests.length
);
