import { get, post, patch, del } from './auth.hub';
import {
    CreateNotificationRequest,
    UpdateNotificationRequest,
    GetNotificationsRequest,
    MarkAllAsReadRequest,
    NotificationResponse,
    NotificationsListResponse,
    NotificationCreateResponse,
    NotificationUpdateResponse,
    NotificationDeleteResponse,
    MarkAllAsReadResponse,
} from '../types/notifications.types';

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Create a new notification
 */
export async function createNotification(
    request: CreateNotificationRequest
): Promise<NotificationCreateResponse> {
    try {
        const response = await post<NotificationCreateResponse>(
            '/api/v1/notifications',
            request
        );
        return response;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
}

/**
 * Get all notifications for the current user with filters and pagination
 */
export async function getNotifications(
    params?: GetNotificationsRequest
): Promise<NotificationsListResponse> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.is_read !== undefined) {
            queryParams.append('is_read', params.is_read.toString());
        }
        if (params?.is_deleted !== undefined) {
            queryParams.append('is_deleted', params.is_deleted.toString());
        }
        if (params?.skip !== undefined) {
            queryParams.append('skip', params.skip.toString());
        }
        if (params?.take !== undefined) {
            queryParams.append('take', params.take.toString());
        }

        const url = `/api/v1/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await get<NotificationsListResponse>(url);
        return response;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw new Error('Failed to fetch notifications');
    }
}

/**
 * Get a specific notification by ID
 */
export async function getNotification(
    notificationId: string
): Promise<NotificationResponse> {
    try {
        const response = await get<NotificationResponse>(
            `/api/v1/notifications/${notificationId}`
        );
        return response;
    } catch (error) {
        console.error('Error fetching notification:', error);
        throw new Error('Failed to fetch notification');
    }
}

/**
 * Update a notification
 */
export async function updateNotification(
    notificationId: string,
    request: Omit<UpdateNotificationRequest, 'notification_id'>
): Promise<NotificationUpdateResponse> {
    try {
        const response = await patch<NotificationUpdateResponse>(
            `/api/v1/notifications/${notificationId}`,
            request
        );
        return response;
    } catch (error) {
        console.error('Error updating notification:', error);
        throw new Error('Failed to update notification');
    }
}

/**
 * Delete a notification
 */
export async function deleteNotification(
    notificationId: string
): Promise<NotificationDeleteResponse> {
    try {
        const response = await del<NotificationDeleteResponse>(
            `/api/v1/notifications/${notificationId}`
        );
        return response;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw new Error('Failed to delete notification');
    }
}

/**
 * Mark all notifications as read for the current user
 */
export async function markAllAsRead(
    request?: MarkAllAsReadRequest
): Promise<MarkAllAsReadResponse> {
    try {
        const response = await post<MarkAllAsReadResponse>(
            '/api/v1/notifications/mark-all-read',
            request || {}
        );
        return response;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw new Error('Failed to mark all notifications as read');
    }
}
