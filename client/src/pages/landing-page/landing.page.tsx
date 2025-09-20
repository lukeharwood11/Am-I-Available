import React from 'react';
import LandingNavBar from './LandingNavBar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import styles from './landing.page.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      <LandingNavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;