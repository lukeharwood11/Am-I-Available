import {
    BaseResponse,
    BaseCreateRequest,
    BaseUpdateRequest,
    BaseDeleteResponse,
    PaginationData,
} from './common.types';

// Notification Data Types
export interface NotificationData {
    id: string;
    user_id: string;
    title: string;
    message: string;
    payload: Record<string, any>;
    is_read: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

// Notification Request Types
export interface CreateNotificationRequest extends BaseCreateRequest {
    title: string;
    message: string;
    payload?: Record<string, any>;
}

export interface UpdateNotificationRequest extends BaseUpdateRequest {
    notification_id: string;
    is_read?: boolean;
    is_deleted?: boolean;
}

export interface GetNotificationsRequest {
    is_read?: boolean;
    is_deleted?: boolean;
    skip?: number;
    take?: number;
}

export interface MarkAllAsReadRequest {
    // No additional fields needed
}

export interface DeleteNotificationRequest {
    notification_id: string;
}

// Notification Response Types
export interface NotificationResponse extends BaseResponse {
    notification: NotificationData;
}

export interface NotificationsListResponse extends BaseResponse {
    notifications: NotificationData[];
    count: number;
    total_count: number;
    skip: number;
    take: number;
    filters?: Record<string, string | boolean>;
}

export interface NotificationCreateResponse extends BaseResponse {
    notification: NotificationData;
}

export interface NotificationUpdateResponse extends BaseResponse {
    notification: NotificationData;
}

export interface NotificationDeleteResponse extends BaseDeleteResponse {}

export interface MarkAllAsReadResponse extends BaseResponse {
    updated_count: number;
}

// Notifications State Types
export interface NotificationsState {
    notifications: NotificationData[];
    currentNotification: NotificationData | null;
    pagination: PaginationData;
    loading: {
        notifications: boolean;
        currentNotification: boolean;
        markAllAsRead: boolean;
        updateMap: Record<string, "delete" | "markAsRead" | null>;
    };
    error: {
        notifications: string | null;
        currentNotification: string | null;
        markAllAsRead: string | null;
    };
}
