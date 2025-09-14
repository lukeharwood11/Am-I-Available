import React, { useState, useRef, useEffect } from 'react';
import styles from './Menu.module.css';

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
  offset?: number;
  disabled?: boolean;
  closeOnItemClick?: boolean;
  className?: string;
  menuClassName?: string;
}

const Menu: React.FC<MenuProps> = ({
  trigger,
  children,
  placement = 'bottom-start',
  offset = 4,
  disabled = false,
  closeOnItemClick = true,
  className,
  menuClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Handle menu item clicks
  const handleMenuClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const menuItem = target.closest('[data-menu-item]');
    
    if (menuItem && closeOnItemClick) {
      const isDisabled = menuItem.getAttribute('data-disabled') === 'true';
      if (!isDisabled) {
        closeMenu();
      }
    }
  };

  const menuClasses = [
    styles.menu,
    styles[placement],
    isOpen ? styles.open : '',
    menuClassName
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.menuContainer,
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={menuClasses}
          style={{ '--offset': `${offset}px` } as React.CSSProperties}
          role="menu"
          onClick={handleMenuClick}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Menu;
