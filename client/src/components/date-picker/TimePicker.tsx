import React, { useState, useEffect } from 'react';
import styles from './TimePicker.module.css';

export type TimePickerVariant = 'default' | 'error';
export type TimePickerSize = 'small' | 'medium' | 'large';

interface TimePickerProps {
  value?: string | null;
  onChange?: (time: string | null) => void;
  placeholder?: string;
  variant?: TimePickerVariant;
  size?: TimePickerSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  // timeFormat?: '12' | '24'; // Reserved for future use - native time input uses 24-hour format
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select time',
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className,
  label,
  required = false,
  error
}) => {
  const [timeValue, setTimeValue] = useState<string>('');

  // Parse the time value
  useEffect(() => {
    if (value) {
      // Handle both full datetime strings and time-only strings
      let timeStr = '';
      if (value.includes('T')) {
        // Full datetime string - extract time part
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const hours = date.getHours();
          const minutes = date.getMinutes();
          timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
      } else if (value.includes(':')) {
        // Time-only string (HH:MM or HH:MM:SS)
        timeStr = value.substring(0, 5); // Take only HH:MM part
      }
      setTimeValue(timeStr);
    } else {
      setTimeValue('');
    }
  }, [value]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTimeValue(newTime);
    onChange?.(newTime || null);
  };

  const containerClasses = [
    styles.timePickerContainer,
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.timeInput,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        type="time"
        aria-label="Time"
        value={timeValue}
        onChange={handleTimeChange}
        placeholder={placeholder}
        className={inputClasses}
        disabled={disabled}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TimePicker;
