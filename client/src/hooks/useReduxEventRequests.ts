import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
    selectEventRequests,
    selectEventRequestsWithApprovals,
    selectCurrentEventRequest,
    selectCurrentEventRequestWithApprovals,
    selectEventRequestsLoading,
    selectEventRequestsError,
    selectEventRequestsPagination,
    selectPendingEventRequests,
    selectApprovedEventRequests,
    selectRejectedEventRequests,
    selectPendingEventRequestsWithApprovals,
    selectApprovedEventRequestsWithApprovals,
    selectRejectedEventRequestsWithApprovals,
    selectEventRequestsWithPendingApprovals,
    selectEventRequestsWithApprovedApprovals,
    selectEventRequestsWithRejectedApprovals,
    selectEventRequestsWithNoApprovals,
    selectHighImportanceEventRequests,
    selectHighImportanceEventRequestsWithApprovals,
    selectEventRequestsCount,
    selectEventRequestsWithApprovalsCount,
    selectPendingEventRequestsCount,
    selectApprovedEventRequestsCount,
    selectRejectedEventRequestsCount,
    selectHighImportanceEventRequestsCount,
    selectSmartParseLoading,
    selectSmartParseResult,
    selectSmartParseError,
} from '../redux/selectors/event-requests.selectors';
import {
    createEventRequestThunk,
    fetchEventRequestsThunk,
    fetchEventRequestsWithApprovalsThunk,
    fetchEventRequestThunk,
    fetchEventRequestWithApprovalsThunk,
    updateEventRequestThunk,
    deleteEventRequestThunk,
    smartParseEventRequestThunk,
} from '../redux/thunks/event-requests.thunk';
import {
    CreateEventRequestRequest,
    UpdateEventRequestRequest,
    GetEventRequestsRequest,
    ListEventRequestsWithApprovalsRequest,
    SmartParseEventRequestRequest,
} from '../redux/types/event-requests.types';

export function useReduxEventRequests() {
    const dispatch = useAppDispatch();

    // Selectors
    const eventRequests = useAppSelector(selectEventRequests);
    const eventRequestsWithApprovals = useAppSelector(
        selectEventRequestsWithApprovals
    );
    const currentEventRequest = useAppSelector(selectCurrentEventRequest);
    const currentEventRequestWithApprovals = useAppSelector(
        selectCurrentEventRequestWithApprovals
    );
    const loading = useAppSelector(selectEventRequestsLoading);
    const error = useAppSelector(selectEventRequestsError);
    const pagination = useAppSelector(selectEventRequestsPagination);

    // Smart parse selectors
    const smartParseLoading = useAppSelector(selectSmartParseLoading);
    const smartParseResult = useAppSelector(selectSmartParseResult);
    const smartParseError = useAppSelector(selectSmartParseError);

    // Filtered selectors
    const pendingEventRequests = useAppSelector(selectPendingEventRequests);
    const approvedEventRequests = useAppSelector(selectApprovedEventRequests);
    const rejectedEventRequests = useAppSelector(selectRejectedEventRequests);
    const pendingEventRequestsWithApprovals = useAppSelector(
        selectPendingEventRequestsWithApprovals
    );
    const approvedEventRequestsWithApprovals = useAppSelector(
        selectApprovedEventRequestsWithApprovals
    );
    const rejectedEventRequestsWithApprovals = useAppSelector(
        selectRejectedEventRequestsWithApprovals
    );
    const eventRequestsWithPendingApprovals = useAppSelector(
        selectEventRequestsWithPendingApprovals
    );
    const eventRequestsWithApprovedApprovals = useAppSelector(
        selectEventRequestsWithApprovedApprovals
    );
    const eventRequestsWithRejectedApprovals = useAppSelector(
        selectEventRequestsWithRejectedApprovals
    );
    const eventRequestsWithNoApprovals = useAppSelector(
        selectEventRequestsWithNoApprovals
    );
    const highImportanceEventRequests = useAppSelector(
        selectHighImportanceEventRequests
    );
    const highImportanceEventRequestsWithApprovals = useAppSelector(
        selectHighImportanceEventRequestsWithApprovals
    );

    // Count selectors
    const eventRequestsCount = useAppSelector(selectEventRequestsCount);
    const eventRequestsWithApprovalsCount = useAppSelector(
        selectEventRequestsWithApprovalsCount
    );
    const pendingEventRequestsCount = useAppSelector(
        selectPendingEventRequestsCount
    );
    const approvedEventRequestsCount = useAppSelector(
        selectApprovedEventRequestsCount
    );
    const rejectedEventRequestsCount = useAppSelector(
        selectRejectedEventRequestsCount
    );
    const highImportanceEventRequestsCount = useAppSelector(
        selectHighImportanceEventRequestsCount
    );

    // Action creators
    const createEventRequest = useCallback(
        async (request: CreateEventRequestRequest) => {
            return dispatch(createEventRequestThunk(request));
        },
        [dispatch]
    );

    const fetchEventRequests = useCallback(
        async (params: GetEventRequestsRequest) => {
            return dispatch(fetchEventRequestsThunk(params));
        },
        [dispatch]
    );

    const fetchEventRequestsWithApprovals = useCallback(
        async (params: ListEventRequestsWithApprovalsRequest) => {
            return dispatch(fetchEventRequestsWithApprovalsThunk(params));
        },
        [dispatch]
    );

    const fetchEventRequest = useCallback(
        async (eventRequestId: string) => {
            return dispatch(fetchEventRequestThunk(eventRequestId));
        },
        [dispatch]
    );

    const fetchEventRequestWithApprovals = useCallback(
        async (eventRequestId: string) => {
            return dispatch(
                fetchEventRequestWithApprovalsThunk(eventRequestId)
            );
        },
        [dispatch]
    );

    const updateEventRequest = useCallback(
        async (
            eventRequestId: string,
            request: Omit<UpdateEventRequestRequest, 'event_request_id'>
        ) => {
            return dispatch(
                updateEventRequestThunk({ eventRequestId, request })
            );
        },
        [dispatch]
    );

    const deleteEventRequest = useCallback(
        async (eventRequestId: string) => {
            return dispatch(deleteEventRequestThunk(eventRequestId));
        },
        [dispatch]
    );

    const smartParseEventRequest = useCallback(
        async (request: SmartParseEventRequestRequest) => {
            return dispatch(smartParseEventRequestThunk(request));
        },
        [dispatch]
    );

    return {
        // State
        eventRequests,
        eventRequestsWithApprovals,
        currentEventRequest,
        currentEventRequestWithApprovals,
        loading,
        error,
        pagination,

        // Smart parse state
        smartParseLoading,
        smartParseResult,
        smartParseError,

        // Filtered data
        pendingEventRequests,
        approvedEventRequests,
        rejectedEventRequests,
        pendingEventRequestsWithApprovals,
        approvedEventRequestsWithApprovals,
        rejectedEventRequestsWithApprovals,
        eventRequestsWithPendingApprovals,
        eventRequestsWithApprovedApprovals,
        eventRequestsWithRejectedApprovals,
        eventRequestsWithNoApprovals,
        highImportanceEventRequests,
        highImportanceEventRequestsWithApprovals,

        // Counts
        eventRequestsCount,
        eventRequestsWithApprovalsCount,
        pendingEventRequestsCount,
        approvedEventRequestsCount,
        rejectedEventRequestsCount,
        highImportanceEventRequestsCount,

        // Actions
        createEventRequest,
        fetchEventRequests,
        fetchEventRequestsWithApprovals,
        fetchEventRequest,
        fetchEventRequestWithApprovals,
        updateEventRequest,
        deleteEventRequest,
        smartParseEventRequest,
    };
}
