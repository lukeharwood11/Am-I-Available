import { Text } from '../../../components';
import { MdNotifications } from 'react-icons/md';
import Card from '../../../components/card/Card';
import styles from './NotificationsSection.module.css';

interface NotificationsSectionProps {}

const NotificationsSection = ({}: NotificationsSectionProps) => {
    return (
        <Card contentClassName={styles.card}>
            <div className={styles.sectionTitle}>
                <MdNotifications />
                <Text variant='heading-small'>Notifications</Text>
            </div>
            <div className={styles.eventsList}>
                {
                    // TODO: Add notifications
                }
                <Text variant='caption'>No notifications</Text>
            </div>
        </Card>
    );
};

export default NotificationsSection;
