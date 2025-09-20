import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchEventRequestsWithApprovalsThunk } from '../../redux/thunks/event-requests.thunk';
import { Approver } from '../../redux/types/event-requests.types';
import { Button, Text, Pill } from '../../components';
import { MdEdit, MdArrowBack } from 'react-icons/md';
import Card from '../../components/card/Card';
import Skeleton from '../../components/skeleton';
import styles from './event-detail.page.module.css';

const EventDetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    const eventRequestsWithApprovals = useSelector(
        (state: RootState) => state.eventRequests.eventRequestsWithApprovals
    );

    const isLoading = useSelector(
        (state: RootState) =>
            state.eventRequests.loading.eventRequestsWithApprovals
    );

    const event = eventRequestsWithApprovals.find(req => req.id === id);

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

    const handleEditEvent = () => {
        navigate(`/events/${id}/edit`);
    };

    const handleBack = () => {
        navigate('/events');
    };

    const formatDateTime = (dateTime: any) => {
        if (!dateTime) return 'Not specified';

        if (dateTime.date) {
            return new Date(dateTime.date).toLocaleDateString();
        }

        if (dateTime.date_time) {
            return new Date(dateTime.date_time).toLocaleString();
        }

        return 'Not specified';
    };

    if (isLoading) {
        return (
            <div className={styles.eventDetailPage}>
                <div className={styles.pageHeader}>
                    <Skeleton width='200px' height='32px' />
                </div>
                <div className={styles.pageContent}>
                    <Skeleton width='100%' height='400px' variant='rounded' />
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className={styles.eventDetailPage}>
                <div className={styles.pageHeader}>
                    <Button
                        variant='secondary-subtle'
                        leftIcon={<MdArrowBack />}
                        onClick={handleBack}
                    >
                        Back to Events
                    </Button>
                </div>
                <div className={styles.pageContent}>
                    <Card contentClassName={styles.notFoundCard}>
                        <Text variant='heading'>Event not found</Text>
                        <Text variant='caption' color='secondary'>
                            The event you're looking for doesn't exist or has
                            been deleted.
                        </Text>
                        <Button variant='primary' onClick={handleBack}>
                            Back to Events
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.eventDetailPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <Button
                        variant='secondary-subtle'
                        leftIcon={<MdArrowBack />}
                        onClick={handleBack}
                    >
                        Back to Events
                    </Button>
                    <div className={styles.headerActions}>
                        <Pill
                            color={getStatusColor(event.status)}
                            size='medium'
                            variant='outlined'
                        >
                            {getStatusLabel(event.status)}
                        </Pill>
                        <Button
                            variant='primary'
                            leftIcon={<MdEdit />}
                            onClick={handleEditEvent}
                        >
                            Edit Event
                        </Button>
                    </div>
                </div>
            </div>

            <div className={styles.pageContent}>
                <div className={styles.eventDetail}>
                    <Card contentClassName={styles.detailCard}>
                        <div className={styles.detailHeader}>
                            <Text variant='heading-large'>{event.title}</Text>
                            <Text variant='caption' color='secondary'>
                                Created{' '}
                                {new Date(
                                    event.created_at
                                ).toLocaleDateString()}
                            </Text>
                        </div>

                        {event.description && (
                            <div className={styles.detailSection}>
                                <Text variant='heading-small'>Description</Text>
                                <Text variant='body'>{event.description}</Text>
                            </div>
                        )}

                        {event.location && (
                            <div className={styles.detailSection}>
                                <Text variant='heading-small'>Location</Text>
                                <Text variant='body'>📍 {event.location}</Text>
                            </div>
                        )}

                        <div className={styles.detailSection}>
                            <Text variant='heading-small'>Date & Time</Text>
                            <div className={styles.dateTimeInfo}>
                                <div className={styles.dateTimeItem}>
                                    <Text variant='caption' color='secondary'>
                                        Start
                                    </Text>
                                    <Text variant='body'>
                                        {formatDateTime(event.start_date)}
                                    </Text>
                                </div>
                                <div className={styles.dateTimeItem}>
                                    <Text variant='caption' color='secondary'>
                                        End
                                    </Text>
                                    <Text variant='body'>
                                        {formatDateTime(event.end_date)}
                                    </Text>
                                </div>
                            </div>
                        </div>

                        {event.notes && (
                            <div className={styles.detailSection}>
                                <Text variant='heading-small'>Notes</Text>
                                <Text variant='body'>{event.notes}</Text>
                            </div>
                        )}

                        {event.approvers && event.approvers.length > 0 && (
                            <div className={styles.detailSection}>
                                <Text variant='heading-small'>Approvers</Text>
                                <div className={styles.approversList}>
                                    {event.approvers.map(
                                        (approver: Approver, index: number) => (
                                            <div
                                                key={index}
                                                className={styles.approverItem}
                                            >
                                                <Text variant='body'>
                                                    {approver.user_id}
                                                </Text>
                                                <Pill
                                                    size='small'
                                                    variant='outlined'
                                                    color={
                                                        approver.required
                                                            ? 'primary'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {approver.required
                                                        ? 'Required'
                                                        : 'Optional'}
                                                </Pill>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
