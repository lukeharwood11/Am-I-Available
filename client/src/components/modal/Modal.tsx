import React from 'react';
import { MdClose } from 'react-icons/md';
import styles from './Modal.module.css';
import Button from '../button/Button';
import Text from '../text/Text';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className={styles.backdrop} 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={`${styles.modal} ${styles[size]}`}>
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && <Text variant='heading-small' className={styles.title}>{title}</Text>}
            {showCloseButton && (
              <Button
                variant="secondary-subtle"
                size="small"
                onClick={onClose}
                leftIcon={<MdClose size={20} />}
                className={styles.closeButton}
                aria-label="Close modal"
              />
            )}
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 