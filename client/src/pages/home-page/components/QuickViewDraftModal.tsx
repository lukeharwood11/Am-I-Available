import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Text, Pill } from '../../../components';
import { EventRequestWithApprovalsData } from '../../../redux/types/event-requests.types';
import { formatDateTime } from '../../../utils/dateUtils';
import styles from './QuickViewDraftModal.module.css';

interface QuickViewDraftModalProps {
    draft: EventRequestWithApprovalsData;
    isOpen: boolean;
    onClose: () => void;
}

const getReviewersStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'Pending';
        case 'approved':
            return 'Approved';
        case 'rejected':
            return 'Rejected';
        case 'no_approvals':
            return 'No Reviewers';
        default:
            return 'Pending';
    }
};

const QuickViewDraftModal: React.FC<QuickViewDraftModalProps> = ({
    draft,
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();

    const handleMoreDetails = () => {
        onClose();
        navigate(`/events/${draft.id}`);
    };


    const getStatusPillProps = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return {
                    color: 'primary' as const,
                    variant: 'filled' as const,
                };
            case 'rejected':
                return { color: 'danger' as const, variant: 'filled' as const };
            default:
                return {
                    color: 'secondary' as const,
                    variant: 'filled' as const,
                };
        }
    };

    const getApprovalProgress = () => {
        if (draft.requested_approvals === 0) return 0;
        return (draft.completed_count / draft.requested_approvals) * 100;
    };

    const footer = (
        <div className={styles.footer}>
            <Button variant='secondary' onClick={onClose}>
                Close
            </Button>
            <Button variant='primary' onClick={handleMoreDetails}>
                More details
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Event Request Details'
            footer={footer}
            size='medium'
        >
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <Text variant='heading-small' className={styles.title}>
                        {draft.title || 'Untitled Event'}
                    </Text>
                </div>

                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <Text
                            variant='caption'
                            color='grey-600'
                            className={styles.detailLabel}
                        >
                            Start Date & Time
                        </Text>
                        <div className={styles.dateTime}>
                            <Text variant='body' className={styles.detailValue}>
                                {formatDateTime(draft.start_date)}
                            </Text>
                        </div>
                    </div>

                    <div className={styles.detailRow}>
                        <Text
                            variant='caption'
                            color='grey-600'
                            className={styles.detailLabel}
                        >
                            End Date & Time
                        </Text>
                        <div className={styles.dateTime}>
                            <Text variant='body' className={styles.detailValue}>
                                {formatDateTime(draft.end_date)}
                            </Text>
                        </div>
                    </div>

                    {draft.location && (
                        <div className={styles.detailRow}>
                            <Text
                                variant='caption'
                                color='grey-600'
                                className={styles.detailLabel}
                            >
                                Location
                            </Text>
                            <Text variant='body' className={styles.detailValue}>
                                {draft.location}
                            </Text>
                        </div>
                    )}

                    {draft.description && (
                        <div className={styles.detailRow}>
                            <Text
                                variant='caption'
                                color='grey-600'
                                className={styles.detailLabel}
                            >
                                Description
                            </Text>
                            <Text variant='body' className={styles.detailValue}>
                                {draft.description}
                            </Text>
                        </div>
                    )}

                    {draft.notes && (
                        <div className={styles.detailRow}>
                            <Text
                                variant='caption'
                                color='grey-600'
                                className={styles.detailLabel}
                            >
                                Notes
                            </Text>
                            <Text variant='body' className={styles.detailValue}>
                                {draft.notes}
                            </Text>
                        </div>
                    )}

                    <div className={styles.approvalInfo}>
                        <div className={styles.approvalStatus}>
                            <Text
                                variant='caption'
                                color='grey-600'
                                className={styles.detailLabel}
                            >
                                Reviewers Status
                            </Text>
                            <Pill
                                size='small'
                                {...getStatusPillProps(draft.approval_status)}
                            >
                                {getReviewersStatusLabel(draft.approval_status)}
                            </Pill>
                        </div>

                        {draft.requested_approvals > 0 && (
                            <div className={styles.approvalProgress}>
                                <Text variant='body-small' color='grey-600'>
                                    {draft.completed_count} of{' '}
                                    {draft.requested_approvals} approvals
                                    completed
                                </Text>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${getApprovalProgress()}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default QuickViewDraftModal;
