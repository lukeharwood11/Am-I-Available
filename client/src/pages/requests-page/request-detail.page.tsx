import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchEventRequestsWithApprovalsThunk } from '../../redux/thunks/event-requests.thunk';
import { Button, Text } from '../../components';
import { MdEdit, MdArrowBack } from 'react-icons/md';
import Card from '../../components/card/Card';
import Pill from '../../components/pill';
import Skeleton from '../../components/skeleton';
import styles from './request-detail.page.module.css';

const RequestDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  
  const eventRequestsWithApprovals = useSelector(
    (state: RootState) => state.eventRequests.eventRequestsWithApprovals
  );
  
  const isLoading = useSelector(
    (state: RootState) => state.eventRequests.loading.eventRequestsWithApprovals
  );

  const request = eventRequestsWithApprovals.find(req => req.id === id);

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

  const handleEditRequest = () => {
    navigate(`/requests/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/requests');
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
      <div className={styles.requestDetailPage}>
        <div className={styles.pageHeader}>
          <Skeleton width='200px' height='32px' />
        </div>
        <div className={styles.pageContent}>
          <Skeleton width='100%' height='400px' variant='rounded' />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className={styles.requestDetailPage}>
        <div className={styles.pageHeader}>
          <Button
            variant='secondary-subtle'
            leftIcon={<MdArrowBack />}
            onClick={handleBack}
          >
            Back to Requests
          </Button>
        </div>
        <div className={styles.pageContent}>
          <Card contentClassName={styles.notFoundCard}>
            <Text variant='heading' size='medium'>Request not found</Text>
            <Text variant='caption' color='secondary'>
              The request you're looking for doesn't exist or has been deleted.
            </Text>
            <Button variant='primary' onClick={handleBack}>
              Back to Requests
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.requestDetailPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <Button
            variant='secondary-subtle'
            leftIcon={<MdArrowBack />}
            onClick={handleBack}
          >
            Back to Requests
          </Button>
          <div className={styles.headerActions}>
            <Pill 
              color={getStatusColor(request.status)} 
              size='medium' 
              variant='outlined'
            >
              {getStatusLabel(request.status)}
            </Pill>
            <Button
              variant='primary'
              leftIcon={<MdEdit />}
              onClick={handleEditRequest}
            >
              Edit Request
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.pageContent}>
        <div className={styles.requestDetail}>
          <Card contentClassName={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Text variant='heading' size='large'>{request.title}</Text>
              <Text variant='caption' color='secondary'>
                Created {new Date(request.created_at).toLocaleDateString()}
              </Text>
            </div>

            {request.description && (
              <div className={styles.detailSection}>
                <Text variant='heading' size='small'>Description</Text>
                <Text variant='body'>{request.description}</Text>
              </div>
            )}

            {request.location && (
              <div className={styles.detailSection}>
                <Text variant='heading' size='small'>Location</Text>
                <Text variant='body'>📍 {request.location}</Text>
              </div>
            )}

            <div className={styles.detailSection}>
              <Text variant='heading' size='small'>Date & Time</Text>
              <div className={styles.dateTimeInfo}>
                <div className={styles.dateTimeItem}>
                  <Text variant='caption' color='secondary'>Start</Text>
                  <Text variant='body'>{formatDateTime(request.start_date)}</Text>
                </div>
                <div className={styles.dateTimeItem}>
                  <Text variant='caption' color='secondary'>End</Text>
                  <Text variant='body'>{formatDateTime(request.end_date)}</Text>
                </div>
              </div>
            </div>

            {request.notes && (
              <div className={styles.detailSection}>
                <Text variant='heading' size='small'>Notes</Text>
                <Text variant='body'>{request.notes}</Text>
              </div>
            )}

            {request.approvers && request.approvers.length > 0 && (
              <div className={styles.detailSection}>
                <Text variant='heading' size='small'>Approvers</Text>
                <div className={styles.approversList}>
                  {request.approvers.map((approver, index) => (
                    <div key={index} className={styles.approverItem}>
                      <Text variant='body'>{approver.user_id}</Text>
                      <Pill 
                        size='small' 
                        variant='outlined'
                        color={approver.required ? 'primary' : 'secondary'}
                      >
                        {approver.required ? 'Required' : 'Optional'}
                      </Pill>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
