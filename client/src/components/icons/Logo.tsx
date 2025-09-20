import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
    size?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, className }) => {
    const combinedClassName = [styles.logo, className]
        .filter(Boolean)
        .join(' ');

    // Calculate font size based on size prop (size represents the height equivalent)
    const fontSize = size * 0.5625; // 18px when size is 32px (18/32 = 0.5625)

    return (
        <h1 className={combinedClassName} style={{ fontSize: `${fontSize}px` }}>
            AM/A
        </h1>
    );
};

export default Logo;
