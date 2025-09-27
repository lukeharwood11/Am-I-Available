import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    NotificationsState,
    NotificationData,
} from '../types/notifications.types';
import {
    createNotificationThunk,
    fetchNotificationsThunk,
    fetchNotificationThunk,
    updateNotificationThunk,
    deleteNotificationThunk,
    markAllAsReadThunk,
    markNotificationAsReadThunk
} from '../thunks/notifications.thunk';

const initialState: NotificationsState = {
    notifications: [],
    currentNotification: null,
    pagination: {
        skip: 0,
        take: 50,
        total_count: 0,
    },
    loading: {
        notifications: false,
        currentNotification: false,
        markAllAsRead: false,
        updateMap: {},
    },
    error: {
        notifications: null,
        currentNotification: null,
        markAllAsRead: null,
    },
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setLoading: (
            state,
            action: PayloadAction<{
                key: keyof NotificationsState['loading'];
                value: boolean | Record<string, "delete" | "markAsRead" | null>;
            }>
        ) => {
            if (action.payload.key === 'updateMap') {
                state.loading.updateMap = action.payload.value as Record<string, "delete" | "markAsRead" | null>;
            } else {
                state.loading[action.payload.key] = action.payload.value as boolean;
            }
        },
        setError: (
            state,
            action: PayloadAction<{
                key: keyof NotificationsState['error'];
                value: string | null;
            }>
        ) => {
            state.error[action.payload.key] = action.payload.value;
        },
        setNotifications: (
            state,
            action: PayloadAction<NotificationData[]>
        ) => {
            state.notifications = action.payload;
        },
        setPagination: (
            state,
            action: PayloadAction<{
                skip: number;
                take: number;
                total_count: number;
            }>
        ) => {
            state.pagination = action.payload;
        },
        setCurrentNotification: (
            state,
            action: PayloadAction<NotificationData | null>
        ) => {
            state.currentNotification = action.payload;
        },
        clearError: (
            state,
            action: PayloadAction<keyof NotificationsState['error']>
        ) => {
            state.error[action.payload] = null;
        },
        clearAllErrors: state => {
            state.error = {
                notifications: null,
                currentNotification: null,
                markAllAsRead: null,
            };
        },
    },
    extraReducers: builder => {
        builder
            // Generic pending handlers
            .addCase(createNotificationThunk.pending, state => {
                state.loading.notifications = true;
                state.error.notifications = null;
            })
            .addCase(fetchNotificationsThunk.pending, state => {
                state.loading.notifications = true;
                state.error.notifications = null;
            })
            .addCase(fetchNotificationThunk.pending, state => {
                state.loading.currentNotification = true;
                state.error.currentNotification = null;
            })
            .addCase(updateNotificationThunk.pending, state => {
                state.loading.notifications = true;
                state.error.notifications = null;
            })
            .addCase(deleteNotificationThunk.pending, state => {
                state.loading.notifications = true;
                state.error.notifications = null;
            })
            .addCase(markAllAsReadThunk.pending, state => {
                state.loading.markAllAsRead = true;
                state.error.markAllAsRead = null;
            })
            // Generic rejected handlers
            .addCase(createNotificationThunk.rejected, (state, action) => {
                state.loading.notifications = false;
                state.error.notifications = action.payload as string;
            })
            .addCase(fetchNotificationsThunk.rejected, (state, action) => {
                state.loading.notifications = false;
                state.error.notifications = action.payload as string;
            })
            .addCase(fetchNotificationThunk.rejected, (state, action) => {
                state.loading.currentNotification = false;
                state.error.currentNotification = action.payload as string;
            })
            .addCase(updateNotificationThunk.rejected, (state, action) => {
                state.loading.notifications = false;
                state.error.notifications = action.payload as string;
            })
            .addCase(deleteNotificationThunk.rejected, (state, action) => {
                state.loading.notifications = false;
                state.error.notifications = action.payload as string;
            })
            .addCase(markAllAsReadThunk.rejected, (state, action) => {
                state.loading.markAllAsRead = false;
                state.error.markAllAsRead = action.payload as string;
            })
            // Fulfilled handlers with data updates
            .addCase(createNotificationThunk.fulfilled, (state, action) => {
                state.loading.notifications = false;
                state.notifications.unshift(action.payload.notification);
            })
            .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
                state.loading.notifications = false;
                state.notifications = action.payload.notifications;
                state.pagination = {
                    skip: action.payload.skip,
                    take: action.payload.take,
                    total_count: action.payload.total_count,
                };
            })
            .addCase(fetchNotificationThunk.fulfilled, (state, action) => {
                state.loading.currentNotification = false;
                state.currentNotification = action.payload.notification;
            })
            .addCase(updateNotificationThunk.fulfilled, (state, action) => {
                state.loading.notifications = false;
                const updatedNotification = action.payload.notification;

                // Update in notifications array
                const notificationIndex = state.notifications.findIndex(
                    n => n.id === updatedNotification.id
                );
                if (notificationIndex !== -1) {
                    state.notifications[notificationIndex] =
                        updatedNotification;
                }

                // Update current notification if it matches
                if (state.currentNotification?.id === updatedNotification.id) {
                    state.currentNotification = updatedNotification;
                }
            })
            .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
                state.loading.notifications = false;
                const notificationId = action.meta.arg;

                // Remove from notifications array
                state.notifications = state.notifications.filter(
                    n => n.id !== notificationId
                );

                // Clear current notification if it matches
                if (state.currentNotification?.id === notificationId) {
                    state.currentNotification = null;
                }
            })
            .addCase(markAllAsReadThunk.fulfilled, (state, _) => {
                state.loading.markAllAsRead = false;
                // Update all notifications to be read
                state.notifications = state.notifications.map(notification => ({
                    ...notification,
                    is_read: true,
                }));
            })
            .addCase(markNotificationAsReadThunk.pending, (state, action) => {
                state.loading.updateMap[action.meta.arg] = "markAsRead";
                state.error.notifications = null;
            })
            .addCase(markNotificationAsReadThunk.rejected, (state, action) => {
                delete state.loading.updateMap[action.meta.arg];
                state.error.notifications = action.payload as string;
            })
            .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
                delete state.loading.updateMap[action.meta.arg];
                const updatedNotification = action.payload.notification;
                state.notifications = state.notifications.filter(notification => notification.id !== updatedNotification.id);
            });

    },
});

export const actions = { ...notificationsSlice.actions };

export default notificationsSlice.reducer;
