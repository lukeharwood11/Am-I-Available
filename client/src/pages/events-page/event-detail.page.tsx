import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchEventRequestsWithApprovalsThunk, deleteEventRequestThunk } from '../../redux/thunks/event-requests.thunk';
import { Approver } from '../../redux/types/event-requests.types';
import { formatDateTime } from '../../utils/dateUtils';
import { Button, Text, Pill, ConfirmationModal } from '../../components';
import { MdEdit, MdArrowBack, MdLocationOn, MdDelete } from 'react-icons/md';
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = useCallback(
        async () => {
            if (!id) return;
            
            try {
                await dispatch(deleteEventRequestThunk(id)).unwrap();
                navigate('/events');
            } catch (error) {
                console.error('Failed to delete event request:', error);
            }
        },
        [dispatch, navigate, id]
    );

    const handleBack = () => {
        navigate('/events');
    };


    if (isLoading) {
        return (
            <div className={styles.eventDetailPage}>
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <Skeleton width='200px' height='32px' />
                    </div>
                    <div className={styles.pageContent}>
                        <Skeleton width='100%' height='400px' variant='rounded' />
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className={styles.eventDetailPage}>
                <div className={styles.container}>
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
            </div>
        );
    }

    return (
        <div className={styles.eventDetailPage}>
            <div className={styles.container}>
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
                            <Button
                                variant='danger'
                                leftIcon={<MdDelete />}
                                onClick={handleDeleteClick}
                            >
                                Delete Event
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={styles.pageContent}>
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
                                <Text variant='body'> <MdLocationOn /> {event.location}</Text>
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
            
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Event"
                message={`Are you sure you want to delete "${event?.title || 'this event'}"?`}
                smallText="This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default EventDetailPage;
