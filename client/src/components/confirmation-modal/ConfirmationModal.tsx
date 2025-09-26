import React from 'react';
import { Modal, Button, Text } from '../';
import { MdWarning } from 'react-icons/md';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    smallText?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary' | 'secondary';
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    smallText,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false,
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal header={<div className={styles.header}><MdWarning /> <Text variant="heading-small">{title}</Text></div>} isOpen={isOpen} onClose={onClose} size="large">
            <div className={styles.confirmationModal}>
                <div className={styles.content}>
                    <Text variant="body">{message}</Text>
                </div>
                {smallText && (
                    <div className={styles.content}>
                        <Text variant="caption">{smallText}</Text>
                    </div>
                )}
                <div className={styles.actions}>
                    <Button
                        variant="secondary-subtle"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant}
                        onClick={handleConfirm}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
