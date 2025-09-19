import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { Button, Text } from '../../components';
import { MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { CreateRequestModal } from './CreateRequestModal';
import { useState, useEffect, useCallback } from 'react';
import { CreateRelationshipModal } from './CreateRelationshipModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserRelationshipsThunk } from '../../redux/thunks/relationships.thunk';
import {
  approveRelationshipRequestThunk,
  fetchReceivedRelationshipRequestsThunk,
  fetchSentRelationshipRequestsThunk,
  rejectRelationshipRequestThunk,
} from '../../redux/thunks/relationship-requests.thunk';
import Pill from '../../components/pill';
import Skeleton from '../../components/skeleton';
import { CreateEventRequestRequest } from '../../redux/types/event-requests.types';
import {
  createEventRequestThunk,
  fetchEventRequestsWithApprovalsThunk,
} from '../../redux/thunks/event-requests.thunk';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);

  const eventRequestsWithApprovals = useSelector(
    (state: RootState) => state.eventRequests.eventRequestsWithApprovals
  );

  const relationships = useSelector(
    (state: RootState) => state.relationships.relationships
  );
  const relationshipRequests = useSelector(
    (state: RootState) => state.relationships.relationshipRequests
  );
  const isLoading = useSelector(
    (state: RootState) => state.relationships.loading.relationships || state.relationships.loading.relationshipRequests || state.relationships.loading.currentRelationship || state.relationships.loading.currentRelationshipRequest || state.eventRequests.loading.eventRequestsWithApprovals
  );

  const loading =
    isLoading &&
    !relationshipRequests.received.length &&
    !relationshipRequests.sent.length &&
    !relationships.length;
  const dispatch = useDispatch<AppDispatch>();

  const handleRefresh = useCallback(() => {
    dispatch(fetchUserRelationshipsThunk({}));
    dispatch(fetchSentRelationshipRequestsThunk());
    dispatch(fetchReceivedRelationshipRequestsThunk('pending'));
    dispatch(fetchEventRequestsWithApprovalsThunk({}));
  }, [dispatch]);

  const handleChangeStatus = useCallback(
    async (requestId: string, status: string) => {
      if (status === 'approved') {
        await dispatch(approveRelationshipRequestThunk(requestId));
      } else if (status === 'rejected') {
        await dispatch(rejectRelationshipRequestThunk(requestId));
      }
      handleRefresh();
    },
    [dispatch]
  );

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Accepted';
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
    }
    return 'secondary';
  };

  const handleRequestCreated = useCallback(
    async (request: CreateEventRequestRequest) => {
      await dispatch(createEventRequestThunk(request));
      handleRefresh();
    },
    [handleRefresh, dispatch]
  );

  return (
    <div className={styles.homePage}>
      <div className={styles.centerContainer}>
        <div className={styles.requests}>
          <div className={styles.requestsHeader}>
            <Text variant='heading'>Event Requests</Text>
            <Button
              size='small'
              variant='primary-subtle'
              leftIcon={<MdAdd />}
              onClick={() => setIsOpen(true)}
            >
              New
            </Button>
          </div>
          {eventRequestsWithApprovals.length > 0 && (
            <div className={styles.requestsList}>
              {eventRequestsWithApprovals.map(request => (
                <Card key={request.id} contentClassName={styles.requestCard}>
                  <Text variant='caption'>{request.title}</Text>
                  <Pill size='small' variant='outlined'>
                    {getStatusLabel(request.status)}
                  </Pill>
                </Card>
              ))}
            </div>
          )}
          {!loading && eventRequestsWithApprovals.length === 0 && (
            <Text variant='caption'>No Requests Found</Text>
          )}
        </div>
        <div className={styles.requests}>
          <div className={styles.requestsHeader}>
            <Text variant='heading'>Relationships</Text>
            <div className={styles.requestsHeaderButtons}>
              <Button
                size='small'
                variant='primary-subtle'
                leftIcon={<MdAdd />}
                onClick={() => setIsRelationshipOpen(true)}
              >
                New
              </Button>
            </div>
          </div>
          {loading &&
            !relationships.length &&
            Array.from({ length: 1 }).map((_, index) => (
              <Skeleton
                width='100%'
                height='60px'
                key={index}
                variant='rounded'
                size='large'
              />
            ))}
          {relationships.length > 0 && (
            <>
              {relationships.map(relationship => (
                <Card
                  key={relationship.id}
                  contentClassName={styles.requestCard}
                >
                  <Text variant='caption'>
                    {relationship.other_user.full_name ||
                      relationship.other_user.email}
                  </Text>
                  {relationship.other_user.full_name && (
                    <Pill size='small' variant='outlined'>
                      {relationship.other_user.email}
                    </Pill>
                  )}
                </Card>
              ))}
            </>
          )}
        </div>
        <div className={styles.requests}>
          <div className={styles.requestsHeader}>
            <Text variant='heading'>Relationship Requests</Text>
            <div className={styles.requestsHeaderButtons}></div>
          </div>
          {loading &&
            Array.from({ length: 1 }).map((_, index) => (
              <Skeleton
                width='100%'
                height='60px'
                key={index}
                variant='rounded'
                size='large'
              />
            ))}
          {relationshipRequests.received.length > 0 &&
            relationshipRequests.received.map((request) => (
              <Card key={request.id} contentClassName={styles.requestCard}>
                {request.requester.full_name ? (
                  <Text variant='caption'>
                    New friend request from {request.requester.full_name}{' '}
                    <Pill size='small' variant='outlined'>
                      {request.requester.email}
                    </Pill>
                  </Text>
                ) : (
                  <Text variant='caption'>
                    New friend request from {request.requester.email}
                  </Text>
                )}
                <div className={styles.requestCardButtons}>
                  <Button
                    leftIcon={<MdCheck />}
                    size='small'
                    variant='primary-subtle'
                    onClick={() => handleChangeStatus(request.id, 'approved')}
                  >
                    Accept
                  </Button>
                  <Button
                    leftIcon={<MdClose />}
                    size='small'
                    variant='danger-subtle'
                    onClick={() => handleChangeStatus(request.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          {relationshipRequests.sent.length > 0 &&
            relationshipRequests.sent.map(request => (
              <Card key={request.id} contentClassName={styles.requestCard}>
                <Text variant='caption'>{request.requested_email}</Text>
                <Pill
                  color={getStatusColor(request.status)}
                  size='small'
                  variant='outlined'
                >
                  {getStatusLabel(request.status)}
                </Pill>
              </Card>
            ))}
          {!loading &&
            relationshipRequests.received.length === 0 &&
            relationshipRequests.sent.length === 0 && (
              <Text variant='caption'>No relationships found</Text>
            )}
        </div>
        {/* <div className={styles.nlpContainer}>
                    <Input fullWidth placeholder='Ask me anything...' />
                    <Button variant='primary-subtle' leftIcon={<MdSend />} onClick={() => {}}/>
                </div> */}
      </div>
      <CreateRequestModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRequestCreated={handleRequestCreated}
      />
      <CreateRelationshipModal
        isOpen={isRelationshipOpen}
        onClose={() => setIsRelationshipOpen(false)}
      />
    </div>
  );
};

export default HomePage;
