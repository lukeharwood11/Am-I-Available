import { Button, Text, Pill } from '../../../components';
import { MdArrowForward, MdDescription } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './PendingDraftsSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { EventRequestWithApprovalsData } from '../../../redux/types/event-requests.types';
import { useState } from 'react';
import QuickViewDraftModal from './QuickViewDraftModal';
import Skeleton from '../../../components/skeleton';

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
                              <div key={draft.id} className={styles.draftItem}>
                                  <div className={styles.draftColumn}>
                                      <Text variant='body'>
                                          {truncateTitle(draft.title)}
                                      </Text>
                                      <Pill size='x-small' variant='outlined'>
                                          {getStatusLabel(draft.status)}
                                      </Pill>
                                  </div>
                                  <Button
                                      onClick={() => {
                                          setDraft(draft);
                                          setIsQuickViewDraftModalOpen(true);
                                      }}
                                      leftIcon={<MdArrowForward />}
                                      variant='secondary-subtle'
                                      size='x-small'
                                  >
                                      View
                                  </Button>
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
        </>
    );
};

export default PendingDraftsSection;
