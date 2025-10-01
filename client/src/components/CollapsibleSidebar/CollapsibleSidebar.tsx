import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdArrowBack } from 'react-icons/md';
import Button from '../button/Button';
import styles from './CollapsibleSidebar.module.css';

export interface SidebarAction {
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

export interface CollapsibleSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    actions: SidebarAction[];
    children?: React.ReactNode;
    className?: string;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
    isCollapsed,
    onToggle,
    actions,
    children,
    className = '',
}) => {
    return (
        <motion.div
            className={`${styles.sidebar} ${className}`}
            initial={false}
            animate={{
                width: isCollapsed ? 60 : 280,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
        >
            {/* Collapse/Expand Button */}
            <div className={styles.header}>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant='secondary-subtle'
                        size='small'
                        onClick={onToggle}
                        className={styles.toggleButton}
                    >
                        <motion.div transition={{ duration: 0.3 }}>
                            {isCollapsed ? (
                                <MdMenu size={16} />
                            ) : (
                                <MdArrowBack size={16} />
                            )}
                        </motion.div>
                    </Button>
                </motion.div>
            </div>

            {/* Actions Section */}
            <div className={styles.actionsSection}>
                {actions.map(action => (
                    <motion.div
                        key={action.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            variant={
                                action.isActive
                                    ? 'primary-subtle'
                                    : 'secondary-subtle'
                            }
                            size='small'
                            onClick={action.onClick}
                            className={`${styles.actionButton} ${
                                action.isActive ? styles.active : ''
                            }`}
                            title={isCollapsed ? action.label : undefined}
                            leftIcon={action.icon}
                        >
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        className={styles.actionLabel}
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {action.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                ))}
            </div>

            {/* Content Section */}
            <AnimatePresence>
                {!isCollapsed && children && (
                    <motion.div
                        className={styles.contentSection}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CollapsibleSidebar;
