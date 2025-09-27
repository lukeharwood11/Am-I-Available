import { Button, Text, Pill } from '../../../components';
import { MdNotifications, MdDelete } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './NotificationsSection.module.css';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsThunk, markNotificationAsReadThunk, deleteNotificationThunk } from '../../../redux/thunks/notifications.thunk';
import { useEffect } from 'react';
import { NotificationData } from '../../../redux/types/notifications.types';
import Skeleton from '../../../components/skeleton';

interface NotificationsSectionProps {}

const MAX_NOTIFICATIONS = 3;

const truncateTitle = (title: string) => {
    if (title.length > 25) {
        return title.slice(0, 25) + '...';
    }
    return title;
};

const getReadStatusLabel = (isRead: boolean) => {
    return isRead ? 'Read' : 'Unread';
};

const NotificationsSection = ({}: NotificationsSectionProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector((state: RootState) => state.notifications.notifications);
    const loading = useSelector((state: RootState) => state.notifications.loading.notifications);
    const updateMap = useSelector((state: RootState) => state.notifications.loading.updateMap);


    // Calculate unread notifications count
    const unreadCount = notifications.filter(notification => !notification.is_read).length;
    console.log('unreadCount', unreadCount);

    useEffect(() => {
        dispatch(fetchNotificationsThunk({
            is_deleted: false,
            is_read: false,
            take: MAX_NOTIFICATIONS
        }));
    }, [dispatch]);

    const handleMarkAsRead = async (notification: NotificationData) => {
        if (!notification.is_read) {
            try {
                await dispatch(markNotificationAsReadThunk(notification.id)).unwrap();
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        }
    };

    const handleDelete = async (notification: NotificationData) => {
        try {
            await dispatch(deleteNotificationThunk(notification.id)).unwrap();
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    return (
        <Card contentClassName={styles.card}>
            <div className={styles.sectionTitle}>
                <div className={styles.notificationIcon}>
                    <MdNotifications />
                    {unreadCount > 0 && (
                        <div className={styles.badge}>
                            <Text variant='caption'>
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </Text>
                        </div>
                    )}
                </div>
                <Text variant='heading-small'>Notifications</Text>
            </div>
            <div className={styles.notifications}>
                {loading
                    ? Array.from({ length: 1 }).map((_, index) => (
                          <Skeleton
                              width={'100%'}
                              height={'70px'}
                              key={index}
                          />
                      ))
                    : notifications.slice(0, 3).map(notification => (
                          <div
                              key={notification.id}
                              className={styles.notificationItem}
                          >
                              <div className={styles.notificationColumn}>
                                  <Text color={notification.is_read ? 'grey-500' : undefined} variant='body'>
                                      {truncateTitle(notification.title)}
                                  </Text>
                                  {
                                    !notification.is_read && (
                                        <Pill 
                                            size='x-small' 
                                            variant='outlined'
                                            color='primary'
                                        >
                                            Unread
                                        </Pill>
                                    )
                                  }
                              </div>
                              <div className={styles.notificationActions}>
                                  {!notification.is_read && (
                                      <Button
                                          onClick={() => handleMarkAsRead(notification)}
                                          variant='secondary-subtle'
                                          size='x-small'
                                          disabled={Boolean(updateMap[notification.id])}
                                          isLoading={updateMap[notification.id] === "markAsRead"}
                                      >
                                          Mark Read
                                      </Button>
                                  )}
                                  {/* <Button
                                      onClick={() => handleDelete(notification)}
                                      leftIcon={<MdDelete />}
                                      variant='danger-subtle'
                                      size='x-small'
                                      disabled={Boolean(updateMap[notification.id])}
                                      isLoading={updateMap[notification.id] === "delete"}
                                  >
                                      Delete
                                  </Button> */}
                              </div>
                          </div>
                      ))}
                {!loading && notifications.length === 0 && (
                    <Text variant='caption'>No notifications</Text>
                )}
            </div>
            {notifications.length > 3 && (
                <div className={styles.notificationActions}>
                    <Button
                        disabled
                        variant='secondary-subtle'
                        size='small'
                    >
                        View All
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default NotificationsSection;
