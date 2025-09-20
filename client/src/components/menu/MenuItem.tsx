import React from 'react';
import styles from './MenuItem.module.css';

interface MenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    destructive?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClick,
    disabled = false,
    destructive = false,
    leftIcon,
    rightIcon,
    className,
}) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            if (onClick) {
                onClick();
            }
        }
    };

    const itemClasses = [
        styles.menuItem,
        disabled ? styles.disabled : '',
        destructive ? styles.destructive : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={itemClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role='menuitem'
            tabIndex={disabled ? -1 : 0}
            data-menu-item='true'
            data-disabled={disabled}
            aria-disabled={disabled}
        >
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
    );
};

export default MenuItem;
