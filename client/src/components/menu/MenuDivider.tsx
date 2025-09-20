import React from 'react';
import styles from './MenuDivider.module.css';

interface MenuDividerProps {
    className?: string;
}

const MenuDivider: React.FC<MenuDividerProps> = ({ className }) => {
    const dividerClasses = [styles.menuDivider, className]
        .filter(Boolean)
        .join(' ');

    return <div className={dividerClasses} role='separator' />;
};

export default MenuDivider;
