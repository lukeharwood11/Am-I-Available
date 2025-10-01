import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import styles from './landing.page.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.session?.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);
    return (
        <div className={styles.landingPage}>
            <main>
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
            </main>
        </div>
    );
};

export default LandingPage;
