import React from 'react';
import { MdPerson, MdLogout, MdAccountCircle } from 'react-icons/md';
import { Menu, MenuItem, MenuDivider } from '../menu';
import styles from './Profile.module.css';

interface ProfileProps {
  name: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  className?: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  onProfile,
  onLogout,
  className,
}) => {
  const profileTrigger = (
    <div className={styles.profileTrigger}>
      <div className={styles.avatar}>
        <MdAccountCircle size={24} />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );

  return (
    <div className={`${styles.profileContainer} ${className || ''}`}>
      <Menu
        trigger={profileTrigger}
        placement='bottom-end'
        offset={8}
        className={styles.profileMenu}
      >
        <MenuItem leftIcon={<MdPerson size={20} />} onClick={onProfile}>
          Profile
        </MenuItem>
        <MenuDivider />

        <MenuItem
          leftIcon={<MdLogout size={20} />}
          onClick={onLogout}
          destructive
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
