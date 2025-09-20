import React, { useState, useEffect } from 'react';
import styles from './DatePicker.module.css';

export type DatePickerVariant = 'default' | 'error';
export type DatePickerSize = 'small' | 'medium' | 'large';

interface DatePickerProps {
    value?: string | null;
    onChange?: (date: string | null) => void;
    placeholder?: string;
    variant?: DatePickerVariant;
    size?: DatePickerSize;
    fullWidth?: boolean;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder = 'Select date',
    variant = 'default',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    minDate,
    maxDate,
    className,
    label,
    required = false,
    error,
}) => {
    const [dateValue, setDateValue] = useState<string>('');

    // Parse the date value
    useEffect(() => {
        if (value) {
            // Handle both full datetime strings and date-only strings
            let dateStr = '';
            if (value.includes('T')) {
                // Full datetime string - extract date part
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    dateStr = date.toISOString().split('T')[0] || '';
                }
            } else if (value.includes('-')) {
                // Date-only string (YYYY-MM-DD)
                dateStr = value;
            }
            setDateValue(dateStr);
        } else {
            setDateValue('');
        }
    }, [value]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        setDateValue(newDate);
        onChange?.(newDate || null);
    };

    const containerClasses = [
        styles.datePickerContainer,
        fullWidth ? styles.fullWidth : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const inputClasses = [
        styles.dateInput,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={containerClasses}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <input
                type='date'
                aria-label='Date'
                value={dateValue}
                onChange={handleDateChange}
                placeholder={placeholder}
                className={inputClasses}
                disabled={disabled}
                min={minDate}
                max={maxDate}
            />

            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default DatePicker;
