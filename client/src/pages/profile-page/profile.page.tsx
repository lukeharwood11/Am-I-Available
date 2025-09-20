import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../../components/card/Card';
import Text from '../../components/text/Text';
import styles from './profile.page.module.css';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.session?.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <Card variant='default' padding='large'>
            <Text variant='heading' color='grey-800'>
              Not authenticated
            </Text>
            <Text variant='body' color='grey-600'>
              Please log in to view your profile.
            </Text>
          </Card>
        </div>
      </div>
    );
  }

  const userMetadata = user.user_metadata || {};
  const appMetadata = user.app_metadata || {};

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Text variant='heading-large' color='grey-800'>
            Profile
          </Text>
          <Text variant='body' color='grey-600'>
            Your account information and settings
          </Text>
        </div>

        <div className={styles.content}>
          <Card variant='default' padding='large' className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <Text variant='heading-small' color='grey-800'>
                Account Information
              </Text>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Name
                </Text>
                <Text variant='body' color='grey-800'>
                  {userMetadata.name ||
                    userMetadata.full_name ||
                    'Not provided'}
                </Text>
              </div>

              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Email
                </Text>
                <Text variant='body' color='grey-800'>
                  {user.email || 'Not provided'}
                </Text>
              </div>

              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Provider
                </Text>
                <Text variant='body' color='grey-800'>
                  {appMetadata.provider || 'Unknown'}
                </Text>
              </div>

              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Email Verified
                </Text>
                <Text
                  variant='body'
                  color={user.email_confirmed_at ? 'primary' : 'danger'}
                >
                  {user.email_confirmed_at ? 'Yes' : 'No'}
                </Text>
              </div>

              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Account Created
                </Text>
                <Text variant='body' color='grey-800'>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : 'Unknown'}
                </Text>
              </div>

              <div className={styles.infoItem}>
                <Text variant='body-small' color='grey-600' weight='medium'>
                  Last Sign In
                </Text>
                <Text variant='body' color='grey-800'>
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : 'Unknown'}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
