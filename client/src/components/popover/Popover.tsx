import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './Popover.module.css';

export type PopoverPosition =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: PopoverPosition;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    disabled?: boolean;
    className?: string;
    contentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
    trigger,
    content,
    position = 'bottom',
    isOpen: controlledIsOpen,
    onOpenChange,
    closeOnClickOutside = true,
    closeOnEscape = true,
    disabled = false,
    className,
    contentClassName,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const setIsOpen = (open: boolean) => {
        if (isControlled) {
            onOpenChange?.(open);
        } else {
            setInternalIsOpen(open);
        }
    };

    const handleTriggerClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape' && isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (!closeOnClickOutside || !isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                contentRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                !contentRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnClickOutside]);

    const getAnimationVariants = (): Variants => {
        const baseVariants = {
            hidden: {
                opacity: 0,
                scale: 0.95,
            },
            visible: {
                opacity: 1,
                scale: 1,
            },
            exit: {
                opacity: 0,
                scale: 0.95,
            },
        };

        // Add positioning and directional animations based on position
        if (position === 'top') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: '-50%', y: -8 },
                visible: { ...baseVariants.visible, x: '-50%', y: 0 },
                exit: { ...baseVariants.exit, x: '-50%', y: -8 },
            };
        } else if (position === 'top-start') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 0, y: -8 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 0, y: -8 },
            };
        } else if (position === 'top-end') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 0, y: -8 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 0, y: -8 },
            };
        } else if (position === 'bottom') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: '-50%', y: 8 },
                visible: { ...baseVariants.visible, x: '-50%', y: 0 },
                exit: { ...baseVariants.exit, x: '-50%', y: 8 },
            };
        } else if (position === 'bottom-start') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 0, y: 8 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 0, y: 8 },
            };
        } else if (position === 'bottom-end') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 0, y: 8 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 0, y: 8 },
            };
        } else if (position === 'left') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: -8, y: '-50%' },
                visible: { ...baseVariants.visible, x: 0, y: '-50%' },
                exit: { ...baseVariants.exit, x: -8, y: '-50%' },
            };
        } else if (position === 'left-start') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: -8, y: 0 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: -8, y: 0 },
            };
        } else if (position === 'left-end') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: -8, y: 0 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: -8, y: 0 },
            };
        } else if (position === 'right') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 8, y: '-50%' },
                visible: { ...baseVariants.visible, x: 0, y: '-50%' },
                exit: { ...baseVariants.exit, x: 8, y: '-50%' },
            };
        } else if (position === 'right-start') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 8, y: 0 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 8, y: 0 },
            };
        } else if (position === 'right-end') {
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 8, y: 0 },
                visible: { ...baseVariants.visible, x: 0, y: 0 },
                exit: { ...baseVariants.exit, x: 8, y: 0 },
            };
        }

        return baseVariants;
    };

    const getMotionStyle = () => {
        // Apply basic positioning without transforms (transforms handled by Framer Motion)
        const style: React.CSSProperties = {};

        if (
            position === 'top' ||
            position === 'top-start' ||
            position === 'top-end'
        ) {
            style.bottom = '100%';
            style.marginBottom = '8px';
            if (position === 'top') {
                style.left = '50%';
            } else if (position === 'top-start') {
                style.left = '0';
            } else if (position === 'top-end') {
                style.right = '0';
            }
        } else if (
            position === 'bottom' ||
            position === 'bottom-start' ||
            position === 'bottom-end'
        ) {
            style.top = '100%';
            style.marginTop = '8px';
            if (position === 'bottom') {
                style.left = '50%';
            } else if (position === 'bottom-start') {
                style.left = '0';
            } else if (position === 'bottom-end') {
                style.right = '0';
            }
        } else if (
            position === 'left' ||
            position === 'left-start' ||
            position === 'left-end'
        ) {
            style.right = '100%';
            style.marginRight = '8px';
            if (position === 'left') {
                style.top = '50%';
            } else if (position === 'left-start') {
                style.top = '0';
            } else if (position === 'left-end') {
                style.bottom = '0';
            }
        } else if (
            position === 'right' ||
            position === 'right-start' ||
            position === 'right-end'
        ) {
            style.left = '100%';
            style.marginLeft = '8px';
            if (position === 'right') {
                style.top = '50%';
            } else if (position === 'right-start') {
                style.top = '0';
            } else if (position === 'right-end') {
                style.bottom = '0';
            }
        }

        return style;
    };

    const getArrowStyle = () => {
        const arrowStyle: React.CSSProperties = {
            position: 'absolute',
            width: 0,
            height: 0,
            border: '6px solid transparent',
        };

        // Use CSS custom properties that will adapt to dark mode
        const borderColor = 'var(--grey-200)';

        if (
            position === 'top' ||
            position === 'top-start' ||
            position === 'top-end'
        ) {
            arrowStyle.top = '100%';
            if (position === 'top') {
                arrowStyle.left = '50%';
                arrowStyle.transform = 'translateX(-50%)';
            } else if (position === 'top-start') {
                arrowStyle.left = '12px';
            } else if (position === 'top-end') {
                arrowStyle.right = '12px';
            }
            arrowStyle.borderTopColor = borderColor;
        } else if (
            position === 'bottom' ||
            position === 'bottom-start' ||
            position === 'bottom-end'
        ) {
            arrowStyle.bottom = '100%';
            if (position === 'bottom') {
                arrowStyle.left = '50%';
                arrowStyle.transform = 'translateX(-50%)';
            } else if (position === 'bottom-start') {
                arrowStyle.left = '12px';
            } else if (position === 'bottom-end') {
                arrowStyle.right = '12px';
            }
            arrowStyle.borderBottomColor = borderColor;
        } else if (
            position === 'left' ||
            position === 'left-start' ||
            position === 'left-end'
        ) {
            arrowStyle.left = '100%';
            if (position === 'left') {
                arrowStyle.top = '50%';
                arrowStyle.transform = 'translateY(-50%)';
            } else if (position === 'left-start') {
                arrowStyle.top = '12px';
            } else if (position === 'left-end') {
                arrowStyle.bottom = '12px';
            }
            arrowStyle.borderLeftColor = borderColor;
        } else if (
            position === 'right' ||
            position === 'right-start' ||
            position === 'right-end'
        ) {
            arrowStyle.right = '100%';
            if (position === 'right') {
                arrowStyle.top = '50%';
                arrowStyle.transform = 'translateY(-50%)';
            } else if (position === 'right-start') {
                arrowStyle.top = '12px';
            } else if (position === 'right-end') {
                arrowStyle.bottom = '12px';
            }
            arrowStyle.borderRightColor = borderColor;
        }

        return arrowStyle;
    };

    return (
        <div
            className={`${styles.container} ${className || ''}`.trim()}
            onKeyDown={handleKeyDown}
        >
            <div
                ref={triggerRef}
                className={styles.trigger}
                onClick={handleTriggerClick}
                role='button'
                tabIndex={disabled ? -1 : 0}
                aria-expanded={isOpen}
                aria-haspopup='true'
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={contentRef}
                        className={`${styles.content} ${contentClassName || ''}`.trim()}
                        style={getMotionStyle()}
                        role='dialog'
                        aria-modal='false'
                        variants={getAnimationVariants()}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut',
                        }}
                    >
                        <div style={getArrowStyle()} />
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Popover;
