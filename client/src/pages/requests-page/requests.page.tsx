import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchEventRequestsWithApprovalsThunk } from '../../redux/thunks/event-requests.thunk';
import { Button, Text } from '../../components';
import { MdAdd, MdEdit, MdLocationOn, MdVisibility } from 'react-icons/md';
import Card from '../../components/card/Card';
import Pill from '../../components/pill';
import Skeleton from '../../components/skeleton';
import styles from './requests.page.module.css';

const RequestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const eventRequestsWithApprovals = useSelector(
    (state: RootState) => state.eventRequests.eventRequestsWithApprovals
  );

  const isLoading = useSelector(
    (state: RootState) => state.eventRequests.loading.eventRequestsWithApprovals
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

  const handleCreateRequest = () => {
    navigate('/requests/new');
  };

  const handleViewRequest = (id: string) => {
    navigate(`/requests/${id}`);
  };

  const handleEditRequest = (id: string) => {
    navigate(`/requests/${id}/edit`);
  };

  return (
    <div className={styles.requestsPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1>Event Requests</h1>
          <Button
            variant='primary'
            leftIcon={<MdAdd />}
            onClick={handleCreateRequest}
          >
            New Request
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
          <div className={styles.requestsList}>
            {eventRequestsWithApprovals.map(request => (
              <Card key={request.id} contentClassName={styles.requestCard}>
                <div className={styles.requestHeader}>
                  <div className={styles.requestInfo}>
                    <Text variant='heading'>{request.title}</Text>
                    <Text variant='caption'>{request.description}</Text>
                    {request.location && (
                      <Text variant='caption' color='secondary'>
                        <MdLocationOn /> {request.location}
                      </Text>
                    )}
                  </div>
                  <div className={styles.requestActions}>
                    <Pill
                      color={getStatusColor(request.status)}
                      size='small'
                      variant='outlined'
                    >
                      {getStatusLabel(request.status)}
                    </Pill>
                  </div>
                </div>

                <div className={styles.requestDetails}>
                  <div className={styles.dateTimeInfo}>
                    <Text variant='caption'>
                      {request.start_date?.date ||
                        request.start_date?.date_time}
                    </Text>
                    {request.end_date && (
                      <Text variant='caption'>
                        -{' '}
                        {request.end_date?.date || request.end_date?.date_time}
                      </Text>
                    )}
                  </div>
                </div>

                <div className={styles.requestActions}>
                  <Button
                    size='small'
                    variant='secondary-subtle'
                    leftIcon={<MdVisibility />}
                    onClick={() => handleViewRequest(request.id)}
                  >
                    View
                  </Button>
                  <Button
                    size='small'
                    variant='primary-subtle'
                    leftIcon={<MdEdit />}
                    onClick={() => handleEditRequest(request.id)}
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
            <Text variant='heading'>No requests found</Text>
            <Text variant='caption' color='secondary'>
              Create your first event request to get started
            </Text>
            <Button
              variant='primary'
              leftIcon={<MdAdd />}
              onClick={handleCreateRequest}
            >
              Create Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
