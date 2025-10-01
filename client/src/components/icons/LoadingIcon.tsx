import React from 'react';
import styles from './LoadingIcon.module.css';

interface LoadingIconProps {
    size?: number;
    className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 32, className }) => {
    const combinedClassName = [styles.loadingIcon, className]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={combinedClassName}
            style={{
                fontSize: `${size * 0.5}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <span className={styles.loadingText}>AMIA</span>
            <div className={styles.loadingOutline} />
        </div>
    );
};

export default LoadingIcon;
