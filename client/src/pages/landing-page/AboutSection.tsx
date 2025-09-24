import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    MdRocket,
    MdAccessTime,
    MdTrendingUp,
    MdSentimentSatisfied,
} from 'react-icons/md';
import { Button } from '../../components';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                ease: 'easeOut',
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
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id='about' className={styles.about}>
            <div className={styles.aboutContent}>
                <motion.div
                    className={styles.aboutText}
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div
                        className={styles.badge}
                        variants={itemVariants}
                    >
                        <MdRocket className={styles.badgeIcon} />
                        About AMIA
                    </motion.div>

                    <motion.h2 className={styles.title} variants={itemVariants}>
                        The Future of
                        <br />
                        <span className={styles.highlight}>
                            Calendar Management
                        </span>
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        variants={itemVariants}
                    >
                        AMIA is your intelligent scheduling assistant that
                        transforms how you manage your calendar.
                    </motion.p>

                    <motion.div
                        className={styles.benefits}
                        variants={itemVariants}
                    >
                        <motion.div
                            className={styles.benefit}
                            variants={itemVariants}
                        >
                            <MdAccessTime className={styles.benefitIcon} />
                            <div className={styles.benefitText}>
                                <h4>Save Time</h4>
                                <p>
                                    Reduce scheduling time by up to 90% with
                                    intelligent automation
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.benefit}
                            variants={itemVariants}
                        >
                            <MdTrendingUp className={styles.benefitIcon} />
                            <div className={styles.benefitText}>
                                <h4>Increase Productivity</h4>
                                <p>
                                    Focus on what matters while AI handles the
                                    scheduling complexity
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.benefit}
                            variants={itemVariants}
                        >
                            <MdSentimentSatisfied
                                className={styles.benefitIcon}
                            />
                            <div className={styles.benefitText}>
                                <h4>Reduce Stress</h4>
                                <p>
                                    Eliminate scheduling conflicts and
                                    last-minute changes
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className={styles.cta} variants={itemVariants}>
                        <Button
                            variant='primary'
                            size='large'
                            onClick={handleGetStartedClick}
                            className={styles.ctaButton}
                        >
                            Start Your AI Journey
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.aboutVisual}
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div
                        className={styles.visualCard}
                        variants={itemVariants}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitle}>AI Assistant</div>
                            <div className={styles.statusIndicator}>
                                <span className={styles.statusDot}></span>
                                Learning
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.aiMessage}>
                                <div className={styles.messageBubble}>
                                    "I've analyzed your calendar patterns and
                                    found 3 optimal time slots for your team
                                    meeting next week."
                                </div>
                                <div className={styles.messageTime}>
                                    2 minutes ago
                                </div>
                            </div>
                            <div className={styles.aiActions}>
                                <div className={styles.actionButton}>
                                    Accept
                                </div>
                                <div className={styles.actionButton}>
                                    Modify
                                </div>
                                <div className={styles.actionButton}>
                                    Decline
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
