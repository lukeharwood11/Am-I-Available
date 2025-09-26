import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { CreateEventRequestRequest } from '../../redux/types/event-requests.types';
import { RequestForm } from './RequestForm';
import { fetchEventRequestWithApprovalsThunk, updateEventRequestThunk, deleteEventRequestThunk } from '../../redux/thunks/event-requests.thunk';
import { selectCurrentEventRequestWithApprovals, selectEventRequestsLoading } from '../../redux/selectors/event-requests.selectors';
import Skeleton from '../../components/skeleton/Skeleton';
import { ConfirmationModal } from '../../components';
import styles from './edit-event.page.module.css';

const EditEventPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    const currentEventRequest = useSelector(selectCurrentEventRequestWithApprovals);
    const loading = useSelector(selectEventRequestsLoading);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch event request data when component mounts
    useEffect(() => {
        if (id) {
            dispatch(fetchEventRequestWithApprovalsThunk(id));
        }
    }, [dispatch, id]);

    // Transform EventRequestData to CreateRequestFormData format
    const initialData = useMemo(() => {
        if (!currentEventRequest) return {};

        // Convert EventDateTime to string format for the form
        const formatDateTime = (dateTime: any) => {
            if (dateTime.date_time) {
                // Extract date and time from ISO string
                const date = new Date(dateTime.date_time);
                return {
                    date: date.toISOString().split('T')[0],
                    time: date.toTimeString().slice(0, 5)
                };
            } else if (dateTime.date) {
                return {
                    date: dateTime.date,
                    time: ''
                };
            }
            return { date: '', time: '' };
        };

        const startDateTime = formatDateTime(currentEventRequest.start_date);
        const endDateTime = formatDateTime(currentEventRequest.end_date);

        return {
            title: currentEventRequest.title || '',
            description: currentEventRequest.description || '',
            location: currentEventRequest.location || '',
            notes: currentEventRequest.notes || '',
            start_date: startDateTime.date,
            end_date: endDateTime.date,
            start_time: startDateTime.time,
            end_time: endDateTime.time,
            approvers: currentEventRequest.approvers || []
        };
    }, [currentEventRequest]);

    const handleSave = useCallback(
        async (request: CreateEventRequestRequest) => {
            if (!id) return;
            
            try {
                await dispatch(updateEventRequestThunk({
                    eventRequestId: id,
                    request: {
                        title: request.title,
                        location: request.location,
                        description: request.description,
                        start_date: request.start_date,
                        end_date: request.end_date,
                        importance_level: request.importance_level,
                        notes: request.notes
                    }
                })).unwrap();
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to update event request:', error);
            }
        },
        [dispatch, navigate, id]
    );

    const handleDeleteClick = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const handleDeleteConfirm = useCallback(
        async () => {
            if (!id) return;
            
            try {
                await dispatch(deleteEventRequestThunk(id)).unwrap();
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to delete event request:', error);
            }
        },
        [dispatch, navigate, id]
    );

    const handleCancel = useCallback(() => {
        navigate('/dashboard');
    }, [navigate]);

    if (loading.currentEventRequestWithApprovals) {
        return (
            <div className={styles.editEventPage}>
                <div className={styles.pageContent}>
                    <div className={styles.skeletonContainer}>
                        <Skeleton variant="text" size="large" width="60%" height="2rem" />
                        <Skeleton variant="text" size="medium" width="100%" height="3rem" />
                        <Skeleton variant="text" size="medium" width="100%" height="3rem" />
                        <Skeleton variant="text" size="medium" width="100%" height="3rem" />
                        <Skeleton variant="text" size="medium" width="100%" height="3rem" />
                        <Skeleton variant="text" size="medium" width="100%" height="6rem" />
                        <div className={styles.skeletonButtons}>
                            <Skeleton variant="rounded" size="medium" width="120px" height="2.5rem" />
                            <Skeleton variant="rounded" size="medium" width="120px" height="2.5rem" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentEventRequest) {
        return (
            <div className={styles.editEventPage}>
                <div className={styles.pageContent}>
                    <div>Event request not found</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.editEventPage}>
                <div className={styles.pageContent}>
                    <RequestForm
                        isNew={false}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDelete={handleDeleteClick}
                        initialData={initialData}
                    />
                </div>
            </div>
            
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Event"
                message={`Are you sure you want to delete "${currentEventRequest?.title || 'this event'}"?`}
                smallText={`This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </>
    );
};

export default EditEventPage;
