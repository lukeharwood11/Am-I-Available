import React from 'react';
import styles from './Pill.module.css';

export type PillColor = 'primary' | 'secondary' | 'danger';
export type PillVariant = 'filled' | 'outlined';
export type PillSize = 'small' | 'medium' | 'large' | 'x-small' | 'xx-small';

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: PillColor;
    variant?: PillVariant;
    size?: PillSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({
    children,
    color = 'primary',
    variant = 'filled',
    size = 'medium',
    leftIcon,
    rightIcon,
    className,
    ...props
}) => {
    const pillClasses = [
        styles.pill,
        styles[color],
        styles[variant],
        styles[size],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={pillClasses} {...props}>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </span>
    );
};

export default Pill;
