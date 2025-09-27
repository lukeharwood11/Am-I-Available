import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createNotification,
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    markAllAsRead,
} from '../hubs/notifications.hub';
import {
    CreateNotificationRequest,
    UpdateNotificationRequest,
    GetNotificationsRequest,
    MarkAllAsReadRequest,
} from '../types/notifications.types';
import { ERROR_MESSAGES } from '../constants';

// Create a new notification
export const createNotificationThunk = createAsyncThunk(
    'notifications/create',
    async (request: CreateNotificationRequest, { rejectWithValue }) => {
        try {
            const response = await createNotification(request);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.NOTIFICATIONS?.CREATE_FAILED ||
                      'Failed to create notification';
            return rejectWithValue(message);
        }
    }
);

// Fetch all notifications with filters and pagination
export const fetchNotificationsThunk = createAsyncThunk(
    'notifications/fetchAll',
    async (params: GetNotificationsRequest = {}, { rejectWithValue }) => {
        try {
            const response = await getNotifications(params);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.NOTIFICATIONS?.FETCH_FAILED ||
                      'Failed to fetch notifications';
            return rejectWithValue(message);
        }
    }
);

// Fetch a specific notification
export const fetchNotificationThunk = createAsyncThunk(
    'notifications/fetchOne',
    async (notificationId: string, { rejectWithValue }) => {
        try {
            const response = await getNotification(notificationId);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.NOTIFICATIONS?.FETCH_FAILED ||
                      'Failed to fetch notification';
            return rejectWithValue(message);
        }
    }
);

// Update a notification
export const updateNotificationThunk = createAsyncThunk(
    'notifications/update',
    async (
        {
            notificationId,
            request,
        }: {
            notificationId: string;
            request: Omit<UpdateNotificationRequest, 'notification_id'>;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await updateNotification(notificationId, request);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.NOTIFICATIONS?.UPDATE_FAILED ||
                      'Failed to update notification';
            return rejectWithValue(message);
        }
    }
);

// Delete a notification
export const deleteNotificationThunk = createAsyncThunk(
    'notifications/delete',
    async (notificationId: string, { rejectWithValue }) => {
        try {
            const response = await deleteNotification(notificationId);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.NOTIFICATIONS?.DELETE_FAILED ||
                      'Failed to delete notification';
            return rejectWithValue(message);
        }
    }
);

// Mark a notification as read
export const markNotificationAsReadThunk = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId: string, { rejectWithValue }) => {
        try {
            const response = await updateNotification(notificationId, { is_read: true });
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to mark notification as read';
            return rejectWithValue(message);
        }
    }
);

// Mark all notifications as read
export const markAllAsReadThunk = createAsyncThunk(
    'notifications/markAllAsRead',
    async (request: MarkAllAsReadRequest = {}, { rejectWithValue }) => {
        try {
            const response = await markAllAsRead(request);
            return response;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to mark all notifications as read';
            return rejectWithValue(message);
        }
    }
);
