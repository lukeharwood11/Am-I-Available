import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import AnimatedLogo from '../../components/animated-logo/AnimatedLogo';
import styles from './LandingNavBar.module.css';
import { MdAutoAwesome, MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const LandingNavBar: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleJoinClick = () => {
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleAboutClick = () => {
        // Scroll to about section or navigate to about page
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Animation variants
    const mobileMenuVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: 0.15,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    const menuItemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    const hamburgerIconVariants: Variants = {
        menu: { rotate: 0 },
        close: { rotate: 180 },
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <AnimatedLogo onClick={() => navigate('/')} />

                <div className={styles.actions}>
                    <Button
                        variant='secondary-subtle'
                        size='medium'
                        onClick={handleAboutClick}
                        className={styles.loginButton}
                    >
                        Log In
                    </Button>
                    <Button
                        variant='primary'
                        size='medium'
                        onClick={handleJoinClick}
                        className={styles.joinButton}
                        leftIcon={<MdAutoAwesome size={18} />}
                    >
                        Start Free Trial
                    </Button>
                </div>

                <motion.button
                    className={styles.hamburgerButton}
                    onClick={toggleMobileMenu}
                    aria-label='Toggle menu'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        variants={hamburgerIconVariants}
                        animate={isMobileMenuOpen ? 'close' : 'menu'}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        {isMobileMenuOpen ? (
                            <MdClose size={24} />
                        ) : (
                            <MdMenu size={24} />
                        )}
                    </motion.div>
                </motion.button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        variants={mobileMenuVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        <div className={styles.mobileMenuContent}>
                            <motion.div variants={menuItemVariants}>
                                <Button
                                    variant='secondary-subtle'
                                    size='medium'
                                    onClick={handleAboutClick}
                                    className={styles.mobileLoginButton}
                                >
                                    Log In
                                </Button>
                            </motion.div>
                            <motion.div variants={menuItemVariants}>
                                <Button
                                    variant='primary'
                                    size='medium'
                                    onClick={handleJoinClick}
                                    className={styles.mobileJoinButton}
                                    leftIcon={<MdAutoAwesome size={18} />}
                                >
                                    Start Free Trial
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default LandingNavBar;
