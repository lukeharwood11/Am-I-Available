import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import Button from '../../components/button/Button';
import { MdHome, MdArrowBack } from 'react-icons/md';
import styles from './not-found.page.module.css';
import Text from '../../components/text/Text';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.content}
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                <motion.div
                    variants={itemVariants}
                    className={styles.logoContainer}
                >
                    <Text className={styles.logo} variant='heading-large'>
                        AM I AVAILABLE?
                    </Text>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className={styles.textContainer}
                >
                    <Text className={styles.subtitle} variant='heading'>
                        Not sure, but this page sure isn't.
                    </Text>
                    <Text className={styles.description} variant='body'>
                        The page you're looking for doesn't exist or has been
                        moved.
                    </Text>
                </motion.div>

                <motion.div variants={itemVariants} className={styles.actions}>
                    <Button
                        variant='primary'
                        size='medium'
                        onClick={handleGoHome}
                        leftIcon={<MdHome size={20} />}
                        className={styles.actionButton}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant='secondary-subtle'
                        size='medium'
                        onClick={handleGoBack}
                        leftIcon={<MdArrowBack size={20} />}
                        className={styles.actionButton}
                    >
                        Go Back
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
