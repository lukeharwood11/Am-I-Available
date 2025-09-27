import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
    deleteEventRequestThunk,
    fetchEventRequestWithApprovalsThunk,
} from '../../redux/thunks/event-requests.thunk';
import { EventRequestApprovalData } from '../../redux/types/event-requests.types';
import { formatDateTime } from '../../utils/dateUtils';
import { Button, Text, Pill, ConfirmationModal } from '../../components';
import { MdEdit, MdArrowBack, MdLocationOn, MdDelete } from 'react-icons/md';
import Card from '../../components/card/Card';
import Skeleton from '../../components/skeleton';
import styles from './event-detail.page.module.css';
import { fetchUserRelationshipsThunk } from '../../redux/thunks/relationships.thunk';

const EventDetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    const event = useSelector(
        (state: RootState) => state.eventRequests.currentEventRequestWithApprovals
    );

    const relationships = useSelector(
        (state: RootState) => state.relationships.relationships
    );

    const isLoading = useSelector(
        (state: RootState) =>
            state.eventRequests.loading.currentEventRequestWithApprovals
    );

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getApprover = (approverId: string) => {
        return relationships.find(relationship => relationship.other_user.id === approverId);
    };

    const handleRefresh = useCallback(() => {
        dispatch(fetchEventRequestWithApprovalsThunk(id as string));
    }, [dispatch]);

    useEffect(() => {
        handleRefresh();
        dispatch(fetchUserRelationshipsThunk({}));
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

    const handleDeleteConfirm = useCallback(async () => {
        if (!id) return;

        try {
            await dispatch(deleteEventRequestThunk(id)).unwrap();
            navigate('/events');
        } catch (error) {
            console.error('Failed to delete event request:', error);
        }
    }, [dispatch, navigate, id]);

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
                        <Skeleton
                            width='100%'
                            height='400px'
                            variant='rounded'
                        />
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
                                The event you're looking for doesn't exist or
                                has been deleted.
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
                    <div className={styles.leftColumn}>
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
                                    <Text variant='body'>
                                        {' '}
                                        <MdLocationOn /> {event.location}
                                    </Text>
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
                        </Card>
                    </div>

                    <div className={styles.rightColumn}>
                        {relationships.length > 0 && event.approvers && event.approvers.length > 0 && (
                            <Card contentClassName={styles.detailCard}>
                                <div className={styles.detailSection}>
                                    <Text variant='heading-small'>Approvers</Text>
                                    <div className={styles.approversList}>
                                        {event.approvers.map(
                                            (approver: EventRequestApprovalData) => (
                                                <div
                                                    key={approver.id}
                                                    className={styles.approverItem}
                                                >
                                                    <div className={styles.approverInfo}>
                                                        <Text variant='body'>
                                                            {getApprover(approver.user_id)?.other_user.full_name}
                                                        </Text>
                                                        <div className={styles.approverStatus}>
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
                                                            <Pill
                                                                size='small'
                                                                variant='filled'
                                                                color={getStatusColor(approver.status)}
                                                            >
                                                                {getStatusLabel(approver.status)}
                                                            </Pill>
                                                        </div>
                                                    </div>
                                                    {approver.response_notes && (
                                                        <div className={styles.approverNotes}>
                                                            <Text variant='caption' color='secondary'>
                                                                Notes: {approver.response_notes}
                                                            </Text>
                                                        </div>
                                                    )}
                                                    {approver.responded_at && (
                                                        <div className={styles.approverTimestamp}>
                                                            <Text variant='caption' color='secondary'>
                                                                Responded: {new Date(approver.responded_at).toLocaleString()}
                                                            </Text>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title='Delete Event'
                message={`Are you sure you want to delete "${event?.title || 'this event'}"?`}
                smallText='This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                variant='danger'
            />
        </div>
    );
};

export default EventDetailPage;
