import React from 'react';
import { motion } from 'framer-motion';
import { Text, Button } from '../../../components';
import styles from './ChatHistory.module.css';
import { MdDelete } from 'react-icons/md';

export interface ChatHistoryItem {
    id: string;
    title: string;
    timestamp: Date;
    preview: string;
}

export interface ChatHistoryProps {
    history: ChatHistoryItem[];
    onSelectHistory: (item: ChatHistoryItem) => void;
    onClearHistory: () => void;
    selectedItemId?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
    history,
    onSelectHistory,
    onClearHistory,
    selectedItemId,
}) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else if (diffInHours < 168) {
            // 7 days
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            return date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
            });
        }
    };

    return (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>
                <Text variant='body-small' weight='medium' color='grey-600'>
                    Chat History
                </Text>
                {history.length > 0 && (
                    <Button
                        variant='danger-subtle'
                        size='x-small'
                        onClick={onClearHistory}
                        title='Clear history'
                        className={styles.clearButton}
                        leftIcon={<MdDelete />}
                    ></Button>
                )}
            </div>

            {history.length === 0 ? (
                <div className={styles.emptyState}>
                    <Text variant='body-small' color='grey-500'>
                        No chat history yet
                    </Text>
                </div>
            ) : (
                <div className={styles.historyList}>
                    {history.map(item => (
                        <motion.div
                            key={item.id}
                            // whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant={
                                    selectedItemId === item.id
                                        ? 'primary-subtle'
                                        : 'secondary-subtle'
                                }
                                size='small'
                                onClick={() => onSelectHistory(item)}
                                contentClassName={`${styles.historyItem} ${
                                    selectedItemId === item.id
                                        ? styles.selected
                                        : ''
                                }`}
                                fullWidth
                            >
                                <div className={styles.historyItemHeader}>
                                    <Text
                                        variant='body-small'
                                        weight='medium'
                                        className={styles.historyTitle}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text variant='caption' color='grey-500'>
                                        {formatDate(item.timestamp)}
                                    </Text>
                                </div>
                                <Text
                                    variant='caption'
                                    color='grey-500'
                                    className={styles.historyPreview}
                                >
                                    {item.preview}
                                </Text>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatHistory;
