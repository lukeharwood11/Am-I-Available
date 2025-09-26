import { Button, Text, Pill, ConfirmationModal } from '../../../components';
import { MdArrowForward, MdDescription, MdDelete } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './PendingDraftsSection.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { EventRequestWithApprovalsData } from '../../../redux/types/event-requests.types';
import { useState } from 'react';
import QuickViewDraftModal from './QuickViewDraftModal';
import Skeleton from '../../../components/skeleton';
import { deleteEventRequestThunk } from '../../../redux/thunks/event-requests.thunk';
import { useNavigate } from 'react-router-dom';

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'pending':
            return 'Pending';
        case 'approved':
            return 'Approved';
    }
};

const truncateTitle = (title: string | null) => {
    if (!title) return 'Untitled Event';
    if (title.length > 20) {
        return title.slice(0, 20) + '...';
    }
    return title;
};

const PendingDraftsSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const drafts = useSelector(
        (state: RootState) => state.eventRequests.eventRequestsWithApprovals
    );
    const draftsLoading = useSelector(
        (state: RootState) =>
            state.eventRequests.loading.eventRequestsWithApprovals
    );
    const loading = draftsLoading && !drafts.length;
    const [isQuickViewDraftModalOpen, setIsQuickViewDraftModalOpen] =
        useState(false);
    const [draft, setDraft] = useState<EventRequestWithApprovalsData | null>(
        null
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [draftToDelete, setDraftToDelete] =
        useState<EventRequestWithApprovalsData | null>(null);
    const navigate = useNavigate();

    const handleDeleteClick = (
        draft: EventRequestWithApprovalsData,
        event: React.MouseEvent
    ) => {
        event.stopPropagation();
        setDraftToDelete(draft);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!draftToDelete) return;

        try {
            await dispatch(deleteEventRequestThunk(draftToDelete.id)).unwrap();
            setDraftToDelete(null);
        } catch (error) {
            console.error('Failed to delete event request:', error);
        }
    };

    const handleClick = (
        e: React.MouseEvent,
        draft: EventRequestWithApprovalsData
    ) => {
        e.stopPropagation();
        setDraft(draft);
        setIsQuickViewDraftModalOpen(true);
    };

    const handleDoubleClick = (draft: EventRequestWithApprovalsData) => {
        navigate(`/events/${draft.id}`);
    };

    return (
        <>
            <Card contentClassName={styles.card}>
                <div className={styles.sectionTitle}>
                    <MdDescription />
                    <Text variant='heading-small'>Pending Drafts</Text>
                </div>
                <div className={styles.drafts}>
                    {loading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <Skeleton
                                  width={'100%'}
                                  height={'70px'}
                                  key={index}
                              />
                          ))
                        : drafts.slice(0, 3).map(draft => (
                              <div
                                  onDoubleClick={() => handleDoubleClick(draft)}
                                  key={draft.id}
                                  className={styles.draftItem}
                              >
                                  <div className={styles.draftColumn}>
                                      <Text variant='body'>
                                          {truncateTitle(draft.title)}
                                      </Text>
                                      <Pill size='x-small' variant='outlined'>
                                          {getStatusLabel(draft.status)}
                                      </Pill>
                                  </div>
                                  <div className={styles.draftActions}>
                                      <Button
                                          onClick={e =>
                                              handleDeleteClick(draft, e)
                                          }
                                          leftIcon={<MdDelete />}
                                          variant='danger-subtle'
                                          size='x-small'
                                      >
                                          Delete
                                      </Button>
                                      <Button
                                          onClick={e => {
                                              handleClick(e, draft);
                                          }}
                                          leftIcon={<MdArrowForward />}
                                          variant='secondary-subtle'
                                          size='x-small'
                                      >
                                          View
                                      </Button>
                                  </div>
                              </div>
                          ))}
                    {!loading && drafts.length === 0 && (
                        <Text variant='caption'>No pending drafts</Text>
                    )}
                </div>
                {drafts.length > 3 && (
                    <div className={styles.draftActions}>
                        <Button
                            disabled
                            variant='secondary-subtle'
                            size='small'
                        >
                            View All
                        </Button>
                    </div>
                )}
            </Card>
            {draft && (
                <QuickViewDraftModal
                    draft={draft}
                    isOpen={isQuickViewDraftModalOpen}
                    onClose={() => setIsQuickViewDraftModalOpen(false)}
                />
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDraftToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title='Delete Event'
                message={`Are you sure you want to delete "${draftToDelete?.title || 'this event'}"?`}
                smallText='This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                variant='danger'
            />
        </>
    );
};

export default PendingDraftsSection;
