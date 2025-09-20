import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { CreateEventRequestRequest } from '../../redux/types/event-requests.types';
import { RequestForm } from './RequestForm';
import styles from './edit-request.page.module.css';

const EditRequestPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  // TODO: Fetch existing request data based on id
  // For now, we'll use empty initial data
  const initialData = {};

  const handleSave = useCallback(
    async (request: CreateEventRequestRequest) => {
      // TODO: Implement update event request thunk
      // await dispatch(updateEventRequestThunk(id, request));
      console.log('Updating request:', id, request);
      navigate('/');
    },
    [dispatch, navigate, id]
  );

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={styles.editRequestPage}>
      <div className={styles.pageHeader}>
        <h1>Edit Event Request</h1>
      </div>
      <div className={styles.pageContent}>
        <RequestForm
          isNew={false}
          onSave={handleSave}
          onCancel={handleCancel}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default EditRequestPage;
