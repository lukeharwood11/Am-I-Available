import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { Button, Text } from '../../components';
import { MdAdd, MdRefresh } from 'react-icons/md';
import { CreateRequestModal } from './CreateRequestModal';
import { useState, useEffect, useCallback } from 'react';
import { CreateRelationshipModal } from './CreateRelationshipModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserRelationshipsThunk } from '../../redux/thunks/relationships.thunk';
import { fetchReceivedRelationshipRequestsThunk, fetchSentRelationshipRequestsThunk } from '../../redux/thunks/relationship-requests.thunk';
import Pill from '../../components/pill';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);
    const relationships = useSelector((state: RootState) => state.relationships.relationships);
    const relationshipRequests = useSelector((state: RootState) => state.relationships.relationshipRequests);
    const dispatch = useDispatch<AppDispatch>();

    const handleRefresh = useCallback(() => {
        dispatch(fetchUserRelationshipsThunk());
        dispatch(fetchSentRelationshipRequestsThunk());
        dispatch(fetchReceivedRelationshipRequestsThunk());
    }, [dispatch]);

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

    return (
        <div className={styles.homePage}>
            <div className={styles.centerContainer}>
                <div className={styles.requests}>
                    <div className={styles.requestsHeader}>
                        <Text variant="heading">Event Requests</Text>
                        <Button size='small' variant='primary-subtle' leftIcon={<MdAdd />} onClick={() => setIsOpen(true)}>New</Button>
                    </div>
                    <Text variant="caption">No Requests Found</Text>
                </div>
                <div className={styles.requests}>
                    <div className={styles.requestsHeader}>
                        <Text variant="heading">Relationship Requests</Text>
                        <div className={styles.requestsHeaderButtons}> 
                            <Button size='small' variant='primary-subtle' leftIcon={<MdAdd />} onClick={() => setIsRelationshipOpen(true)}>New</Button>
                            <Button size='small' variant='primary-subtle' leftIcon={<MdRefresh />} onClick={handleRefresh}>Refresh</Button>
                        </div>
                    </div>
                    {
                        relationshipRequests.received.length > 0 && (
                            relationshipRequests.received.map((request) => (
                                <Card key={request.id} contentClassName={styles.requestCard}>
                                    <Text variant="caption">New friend request from {request.requester_id}</Text> 
                                    <div className={styles.requestCardButtons}>
                                        <Button size="small" variant="primary-subtle">Accept</Button>
                                        <Button size="small" variant="danger-subtle">Reject</Button>
                                    </div>
                                </Card>
                            ))
                        ) 
                    }
                    {
                        relationshipRequests.sent.length > 0 && (
                            relationshipRequests.sent.map((request) => (
                                <Card key={request.id} contentClassName={styles.requestCard}>
                                    <Text variant="caption">{request.requested_email}</Text> 
                                    <Pill color={getStatusColor(request.status)} size="small" variant="outlined">{getStatusLabel(request.status)}</Pill>
                                </Card>
                            ))
                        )
                    }
                    {
                        relationshipRequests.received.length === 0 && relationshipRequests.sent.length === 0 && (
                            <Text variant="caption">No relationships found</Text>
                        )
                    }
                </div>
                {/* <div className={styles.nlpContainer}>
                    <Input fullWidth placeholder='Ask me anything...' />
                    <Button variant='primary-subtle' leftIcon={<MdSend />} onClick={() => {}}/>
                </div> */}
            </div>
            <CreateRequestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <CreateRelationshipModal isOpen={isRelationshipOpen} onClose={() => setIsRelationshipOpen(false)} />
        </div>
    );
};

export default HomePage;