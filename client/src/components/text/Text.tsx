import React from 'react';
import styles from './Text.module.css';

export type TextVariant =
    | 'caption'
    | 'body-small'
    | 'body'
    | 'heading-small'
    | 'heading'
    | 'heading-large';
export type TextColor =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'grey-100'
    | 'grey-200'
    | 'grey-300'
    | 'grey-400'
    | 'grey-500'
    | 'grey-600'
    | 'grey-800'
    | 'inherit';

export type TextElement =
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div';

interface TextProps {
    children: React.ReactNode;
    variant?: TextVariant;
    color?: TextColor;
    as?: TextElement;
    className?: string;
    weight?: 'light' | 'normal' | 'medium' | 'bold';
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
}

const Text: React.FC<TextProps> = ({
    children,
    variant = 'body',
    color = 'inherit',
    as,
    className,
    weight = 'normal',
    align = 'left',
    truncate = false,
    ...props
}) => {
    // Determine the HTML element to use
    const getDefaultElement = (variant: TextVariant): TextElement => {
        switch (variant) {
            case 'heading-large':
                return 'h1';
            case 'heading':
                return 'h2';
            case 'heading-small':
                return 'h3';
            case 'body':
            case 'body-small':
                return 'p';
            case 'caption':
                return 'span';
            default:
                return 'p';
        }
    };

    const Element = as || getDefaultElement(variant);

    const textClasses = [
        styles.text,
        styles[variant],
        styles[`color-${color}`],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        truncate ? styles.truncate : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Element className={textClasses} {...props}>
            {children}
        </Element>
    );
};

export default Text;
