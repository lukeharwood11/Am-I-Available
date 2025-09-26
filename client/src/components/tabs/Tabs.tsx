import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
    id: string;
    label: string;
    content?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    activeTabId: string;
    onTabChange: (tabId: string) => void;
    variant?: 'default' | 'underlined' | 'pills';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTabId,
    onTabChange,
    variant = 'default',
    size = 'medium',
    fullWidth = false,
    className,
}) => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);

    const tabsClasses = [
        styles.tabs,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const handleTabClick = (tabId: string, disabled?: boolean) => {
        if (!disabled) {
            onTabChange(tabId);
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent,
        tabId: string,
        disabled?: boolean
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTabClick(tabId, disabled);
        }
    };

    return (
        <div className={tabsClasses}>
            <div className={styles.tabList} role='tablist'>
                {tabs.map(tab => {
                    const isActive = tab.id === activeTabId;
                    const tabClasses = [
                        styles.tab,
                        isActive ? styles.active : '',
                        tab.disabled ? styles.disabled : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <button
                            key={tab.id}
                            className={tabClasses}
                            role='tab'
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.id}`}
                            tabIndex={tab.disabled ? -1 : 0}
                            onClick={() => handleTabClick(tab.id, tab.disabled)}
                            onKeyDown={e =>
                                handleKeyDown(e, tab.id, tab.disabled)
                            }
                            disabled={tab.disabled}
                        >
                            <div className={styles.tabTitleContent}>
                                {tab.icon && (
                                    <span className={styles.tabIcon}>
                                        {tab.icon}
                                    </span>
                                )}
                                {tab.label && (
                                    <span className={styles.tabLabel}>
                                        {tab.label}
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            {activeTab && activeTab.content && (
                <div className={styles.tabContent}>
                    <div
                        className={styles.tabPanel}
                        role='tabpanel'
                        id={`panel-${activeTab.id}`}
                        aria-labelledby={activeTab.id}
                    >
                        {activeTab.content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tabs;
