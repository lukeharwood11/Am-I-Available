import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavBar from '../../pages/landing-page/LandingNavBar';
import Footer from '../../pages/landing-page/Footer';
import styles from './LandingLayout.module.css';

const LandingLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <LandingNavBar />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default LandingLayout;
