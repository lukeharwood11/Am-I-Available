import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchEventRequestsWithApprovalsThunk } from '../../redux/thunks/event-requests.thunk';
import { Button, Text } from '../../components';
import { MdAdd, MdEdit, MdLocationOn, MdVisibility } from 'react-icons/md';
import Card from '../../components/card/Card';
import { Pill } from '../../components/pill';
import Skeleton from '../../components/skeleton';
import { formatDateTimeShort } from '../../utils/dateUtils';
import styles from './events.page.module.css';

const EventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const eventRequestsWithApprovals = useSelector(
        (state: RootState) => state.eventRequests.eventRequestsWithApprovals
    );

    const isLoading = useSelector(
        (state: RootState) =>
            state.eventRequests.loading.eventRequestsWithApprovals
    );

    const handleRefresh = useCallback(() => {
        dispatch(fetchEventRequestsWithApprovalsThunk({}));
    }, [dispatch]);

    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'approved':
                return 'primary';
            case 'rejected':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    const handleCreateEvent = () => {
        navigate('/events/new');
    };

    const handleViewEvent = (id: string) => {
        navigate(`/events/${id}`);
    };

    const handleEditEvent = (id: string) => {
        navigate(`/events/${id}/edit`);
    };

    return (
        <div className={styles.eventsPage}>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerContent}>
                        <h1>Events</h1>
                        <Button
                            variant='primary'
                            leftIcon={<MdAdd />}
                            onClick={handleCreateEvent}
                        >
                            New Event
                        </Button>
                    </div>
                </div>

                <div className={styles.pageContent}>
                    {isLoading && eventRequestsWithApprovals.length === 0 && (
                        <div className={styles.skeletonContainer}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width='100%'
                                    height='80px'
                                    variant='rounded'
                                    size='large'
                                />
                            ))}
                        </div>
                    )}

                    {eventRequestsWithApprovals.length > 0 && (
                        <div className={styles.eventsList}>
                            {eventRequestsWithApprovals.map(event => (
                                <Card
                                    key={event.id}
                                    contentClassName={styles.eventCard}
                                >
                                    <div className={styles.eventHeader}>
                                        <div className={styles.eventInfo}>
                                            <Text variant='heading'>
                                                {event.title}
                                            </Text>
                                            <Text variant='caption'>
                                                {event.description}
                                            </Text>
                                            {event.location && (
                                                <Text
                                                    variant='caption'
                                                    color='secondary'
                                                >
                                                    <MdLocationOn />{' '}
                                                    {event.location}
                                                </Text>
                                            )}
                                        </div>
                                        <div className={styles.eventActions}>
                                            <Pill
                                                color={getStatusColor(
                                                    event.status
                                                )}
                                                size='small'
                                                variant='outlined'
                                            >
                                                {getStatusLabel(event.status)}
                                            </Pill>
                                        </div>
                                    </div>

                                    <div className={styles.eventDetails}>
                                        <div className={styles.dateTimeInfo}>
                                            <Text variant='caption'>
                                                {formatDateTimeShort(
                                                    event.start_date
                                                )}
                                            </Text>
                                            {event.end_date && (
                                                <Text variant='caption'>
                                                    -{' '}
                                                    {formatDateTimeShort(
                                                        event.end_date
                                                    )}
                                                </Text>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.eventActions}>
                                        <Button
                                            size='small'
                                            variant='secondary-subtle'
                                            leftIcon={<MdVisibility />}
                                            onClick={() =>
                                                handleViewEvent(event.id)
                                            }
                                        >
                                            View
                                        </Button>
                                        <Button
                                            size='small'
                                            variant='primary-subtle'
                                            leftIcon={<MdEdit />}
                                            onClick={() =>
                                                handleEditEvent(event.id)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {!isLoading && eventRequestsWithApprovals.length === 0 && (
                        <div className={styles.emptyState}>
                            <Text variant='heading'>No events found</Text>
                            <Text variant='caption' color='secondary'>
                                Create your first event to get started
                            </Text>
                            <Button
                                variant='primary'
                                leftIcon={<MdAdd />}
                                onClick={handleCreateEvent}
                            >
                                Create Event
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
