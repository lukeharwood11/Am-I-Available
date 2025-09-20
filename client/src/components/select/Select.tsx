import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import styles from './Select.module.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export type SelectVariant = 'default' | 'error';
export type SelectSize = 'small' | 'medium' | 'large';

interface SelectProps {
    options: SelectOption[];
    value?: string;
    placeholder?: string;
    variant?: SelectVariant;
    size?: SelectSize;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: (value: string | null) => void;
    className?: string;
    'data-testid'?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    value = '',
    placeholder = 'Select an option',
    variant = 'default',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    required = false,
    onChange,
    className,
    ...props
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value || null;
        onChange?.(selectedValue);
    };

    const wrapperClasses = [
        styles.selectWrapper,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const selectClasses = [styles.select, styles[variant], styles[size]]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClasses}>
            <select
                className={selectClasses}
                value={value || ''}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                {...props}
            >
                {placeholder && (
                    <option value='' disabled={required}>
                        {placeholder}
                    </option>
                )}
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <span className={styles.icon}>
                <MdExpandMore size={20} />
            </span>
        </div>
    );
};

export default Select;
