import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { CreateEventRequestRequest } from '../../redux/types/event-requests.types';
import { createEventRequestThunk } from '../../redux/thunks/event-requests.thunk';
import { RequestForm } from './RequestForm';
import { Text } from '../../components';
import styles from './create-events.page.module.css';

const CreateEventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = useCallback(
        async (request: CreateEventRequestRequest) => {
            await dispatch(createEventRequestThunk(request));
            navigate('/');
        },
        [dispatch, navigate]
    );

    const handleCancel = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className={styles.createEventsPage}>
            <div className={styles.pageContent}>
                <RequestForm
                    isNew={true}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default CreateEventsPage;
