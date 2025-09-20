import styles from './home.page.module.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { fetchUserRelationshipsThunk } from '../../redux/thunks/relationships.thunk';
import {
  fetchReceivedRelationshipRequestsThunk,
  fetchSentRelationshipRequestsThunk,
} from '../../redux/thunks/relationship-requests.thunk';
import { fetchEventRequestsWithApprovalsThunk } from '../../redux/thunks/event-requests.thunk';
import { CreateRelationshipModal } from './CreateRelationshipModal';
import {
  SmartCreateSection,
  UpcomingEventsSection,
  QuickActionsSection,
  SuggestionsSection,
  PendingDraftsSection,
  TasksSection,
} from './components';

const HomePage = () => {
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleRefresh = useCallback(() => {
    dispatch(fetchUserRelationshipsThunk({}));
    dispatch(fetchSentRelationshipRequestsThunk());
    dispatch(fetchReceivedRelationshipRequestsThunk('pending'));
    dispatch(fetchEventRequestsWithApprovalsThunk({}));
  }, [dispatch]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleSmartCreate = useCallback(() => {
    // TODO: Implement smart create functionality
    console.log('Smart create clicked');
  }, []);

  const handleCreateEvent = useCallback(() => {
    navigate('/requests/new');
  }, [navigate]);

  const handleAddTask = useCallback(() => {
    // TODO: Implement add task functionality
    console.log('Add task clicked');
  }, []);

  const handleManageRelationships = useCallback(() => {
    setIsRelationshipOpen(true);
  }, []);

  const handleViewCalendar = useCallback(() => {
    // TODO: Implement view calendar functionality
    console.log('View calendar clicked');
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <SmartCreateSection onSmartCreate={handleSmartCreate} />
          <UpcomingEventsSection events={[]} />
          <QuickActionsSection
            onCreateEvent={handleCreateEvent}
            onAddTask={handleAddTask}
            onManageRelationships={handleManageRelationships}
            onViewCalendar={handleViewCalendar}
          />
        </div>

        <div className={styles.rightColumn}>
          <SuggestionsSection />
          <PendingDraftsSection />
          <TasksSection />
        </div>
      </div>

      <CreateRelationshipModal
        isOpen={isRelationshipOpen}
        onClose={() => setIsRelationshipOpen(false)}
      />
    </div>
  );
};

export default HomePage;
