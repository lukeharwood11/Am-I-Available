import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './AnimatedLogo.module.css';

interface AnimatedLogoProps {
  onClick?: () => void;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ onClick, className }) => {
  const [showFullText, setShowFullText] = useState(true);

  useEffect(() => {
    // Show full text for 3 seconds, then transition to "AMIA"
    const timer = setTimeout(() => {
      setShowFullText(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 }
  };

  const wordVariants: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    slideOut: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const spaceVariants: Variants = {
    visible: {
      width: "0.5rem",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className={`${styles.logo} ${className || ''}`}
      onClick={onClick}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <h1 className={styles.logoText}>
        {/* AM - always visible */}
        <motion.span
          variants={wordVariants}
          animate="visible"
          className={styles.word}
        >
          AM
        </motion.span>
        
        {/* Space after AM */}
        <motion.span
          variants={spaceVariants}
          animate={showFullText ? "visible" : "hidden"}
          className={styles.space}
        />
        
        {/* I - always visible */}
        <motion.span
          variants={wordVariants}
          animate="visible"
          className={styles.word}
        >
          I
        </motion.span>
        
        {/* Space after I */}
        <motion.span
          variants={spaceVariants}
          animate={showFullText ? "visible" : "hidden"}
          className={styles.space}
        />
        
        {/* A from AVAILABLE - stays in place */}
        <motion.span
          variants={wordVariants}
          animate="visible"
          className={styles.word}
        >
          A
        </motion.span>
        
        {/* VAILABLE? - slides out */}
        <AnimatePresence>
          {showFullText && (
            <motion.span
              variants={wordVariants}
              initial="visible"
              exit="slideOut"
              className={styles.word}
            >
              VAILABLE?
            </motion.span>
          )}
        </AnimatePresence>
      </h1>
    </motion.div>
  );
};

export default AnimatedLogo;
