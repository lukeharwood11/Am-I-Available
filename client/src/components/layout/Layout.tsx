import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../nav-bar/NavBar';
import styles from './Layout.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Layout: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.session?.user);
  const name = user?.user_metadata.name;
  return (
    <div className={styles.layout}>
      <NavBar name={name} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 