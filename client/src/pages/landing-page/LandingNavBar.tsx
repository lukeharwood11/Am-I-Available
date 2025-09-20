import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import AnimatedLogo from '../../components/animated-logo/AnimatedLogo';
import styles from './LandingNavBar.module.css';

const LandingNavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/login');
  };

  const handleAboutClick = () => {
    // Scroll to about section or navigate to about page
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <AnimatedLogo onClick={() => navigate('/')} />

        <div className={styles.actions}>
          <Button
            variant="secondary-subtle"
            size="medium"
            onClick={handleAboutClick}
            className={styles.aboutButton}
          >
            About
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleJoinClick}
            className={styles.joinButton}
          >
            Join
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingNavBar;
