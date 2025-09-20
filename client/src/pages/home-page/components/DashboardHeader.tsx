import { Text } from '../../../components';
import styles from './DashboardHeader.module.css';

interface DashboardHeaderProps {
    userName?: string;
    userEmail?: string;
    userInitials?: string;
}

const DashboardHeader = ({
    userName = 'John Doe',
    userEmail = 'john@example.com',
    userInitials = 'JD',
}: DashboardHeaderProps) => {
    return (
        <div className={styles.header}>
            <Text variant='heading'>Am I Available</Text>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>{userInitials}</div>
                <div className={styles.userDetails}>
                    <Text variant='body'>{userName}</Text>
                    <Text variant='caption'>{userEmail}</Text>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
