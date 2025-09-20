import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdAutoAwesome } from 'react-icons/md';
import { Button } from '../../components';
import styles from './HeroSection.module.css';
import { useMediaQuery } from 'react-responsive';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery({ query: '(max-width: 768px)' });

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroText}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* <motion.div className={styles.badge} variants={itemVariants}>
            <MdAutoAwesome className={styles.badgeIcon} />
            AI-Powered Scheduling
          </motion.div> */}

          <motion.h1 className={styles.title} variants={itemVariants}>
            {
                mediaQuery ? (
                    <>
                    Your Calendar <br /> <span className={styles.highlight}> AI Assistant</span>
                    </>
                ) : (
                    <>
                    Your Personal
                    <span className={styles.highlight}> AI Assistant</span>
                    <br />
                    for Calendar Management
                    </>
                )
            }
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
                AM/A intelligently manages your calendar, so you don't have to.
          </motion.p>

          <motion.div className={styles.ctaButtons} variants={itemVariants}>
            <Button
              variant="primary"
              size="large"
              onClick={handleGetStartedClick}
              className={styles.primaryButton}
            >
              Get Started Free
            </Button>
            <Button
              variant="secondary-subtle"
              size="large"
              onClick={handleLearnMoreClick}
              className={styles.secondaryButton}
            >
              Learn More
            </Button>
          </motion.div>
          {
            !mediaQuery && (
                <>
                    <motion.div className={styles.stats} variants={itemVariants}>
                        <div className={styles.stat}>
                        <span className={styles.statNumber}>10x</span>
                        <span className={styles.statLabel}>Faster Planning*</span>
                        </div>
                        <div className={styles.stat}>
                        <span className={styles.statNumber}>100%</span>
                        <span className={styles.statLabel}>Happier Scheduling*</span>
                        </div>
                        <div className={styles.stat}>
                        <span className={styles.statNumber}>24/7</span>
                        <span className={styles.statLabel}>AI Availability</span>
                        </div>
                    </motion.div>
                    <span className={styles.statsDisclaimer}>*Based on one user's feedback, who happens to be the creator of AM/A</span>
                </>
            )
          }

        </motion.div>

        {
            !mediaQuery && (
                <motion.div
                className={styles.heroVisual}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                >
                <motion.div className={styles.calendarMockup} variants={itemVariants}>
                    <div className={styles.calendarHeader}>
                    <div className={styles.calendarTitle}>Smart Calendar</div>
                    <div className={styles.aiIndicator}>
                        <span className={styles.aiDot}></span>
                        AI Active
                    </div>
                    </div>
                    <div className={styles.calendarGrid}>
                    {Array.from({ length: 21 }, (_, i) => (
                        <div key={i} className={styles.calendarDay}>
                        {i < 7 && <div className={styles.dayLabel}>{['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}</div>}
                        {i >= 7 && (
                            <div className={styles.dayNumber}>
                            {i - 6}
                            {i === 10 && <div className={styles.meetingSlot}>9:00 AM</div>}
                            {i === 15 && <div className={styles.meetingSlot}>2:00 PM</div>}
                            {i === 20 && <div className={styles.meetingSlot}>4:30 PM</div>}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                </motion.div>
            </motion.div>
            )
        }

      </div>
    </section>
  );
};

export default HeroSection;
