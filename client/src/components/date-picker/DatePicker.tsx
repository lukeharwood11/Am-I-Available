import React, { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';
import { MdCalendarMonth } from 'react-icons/md';
import Button from '../button/Button';

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
  includeTime?: boolean;
  timeFormat?: '12' | '24';
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
  includeTime = false,
  timeFormat = '24'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    return value ? new Date(value) : null;
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<{ hours: number; minutes: number; ampm?: 'AM' | 'PM' }>(() => {
    if (value && includeTime) {
      const date = new Date(value);
      if (timeFormat === '12') {
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return { hours: displayHours, minutes: date.getMinutes(), ampm };
      } else {
        return { hours: date.getHours(), minutes: date.getMinutes() };
      }
    }
    return { hours: 9, minutes: 0, ampm: 'AM' };
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(value ? new Date(value) : null);
    if (value && includeTime) {
      const date = new Date(value);
      if (timeFormat === '12') {
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        setSelectedTime({ hours: displayHours, minutes: date.getMinutes(), ampm });
      } else {
        setSelectedTime({ hours: date.getHours(), minutes: date.getMinutes() });
      }
    }
  }, [value, includeTime, timeFormat]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    if (includeTime) {
      const dateStr = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      if (timeFormat === '12') {
        const timeStr = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return `${dateStr} ${timeStr}`;
      } else {
        const timeStr = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        return `${dateStr} ${timeStr}`;
      }
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const createDateTime = (date: Date, time: { hours: number; minutes: number; ampm?: 'AM' | 'PM' }): string => {
    const newDate = new Date(date);
    
    if (includeTime) {
      let hours = time.hours;
      if (timeFormat === '12' && time.ampm) {
        if (time.ampm === 'PM' && hours !== 12) {
          hours += 12;
        } else if (time.ampm === 'AM' && hours === 12) {
          hours = 0;
        }
      }
      
      newDate.setHours(hours, time.minutes, 0, 0);
    }
    
    return newDate.toISOString();
  };

  const handleDateSelect = (date: Date) => {
    const newDateTime = createDateTime(date, selectedTime);
    setSelectedDate(new Date(newDateTime));
    onChange?.(newDateTime);
    
    if (!includeTime) {
      setIsOpen(false);
    }
  };

  const handleTimeChange = (field: 'hours' | 'minutes' | 'ampm', value: number | 'AM' | 'PM') => {
    const newTime = { ...selectedTime, [field]: value };
    setSelectedTime(newTime);
    
    if (selectedDate) {
      const newDateTime = createDateTime(selectedDate, newTime);
      setSelectedDate(new Date(newDateTime));
      onChange?.(newDateTime);
    }
  };

  const handleApplyTime = () => {
    if (selectedDate) {
      const newDateTime = createDateTime(selectedDate, selectedTime);
      setSelectedDate(new Date(newDateTime));
      onChange?.(newDateTime);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const today = isToday(date);

      days.push(
        <button
          key={day}
          className={[
            styles.day,
            selected ? styles.selected : '',
            today ? styles.today : '',
            disabled ? styles.disabled : ''
          ].filter(Boolean).join(' ')}
          onClick={() => !disabled && handleDateSelect(date)}
          disabled={disabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const containerClasses = [
    styles.datePickerContainer,
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const inputWrapperClasses = [
    styles.inputWrapper,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isOpen ? styles.open : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={inputWrapperClasses}>
        <input
          type="text"
          value={formatDate(selectedDate)}
          placeholder={placeholder}
          readOnly
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={styles.input}
          disabled={disabled}
        />
        
        <div className={styles.icons}>
          {selectedDate && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear date"
            >
              ×
            </button>
          )}
          <button
            type="button"
            className={styles.calendarButton}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label="Open calendar"
          >
            <MdCalendarMonth />
          </button>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateMonth('prev')}
              aria-label="Previous month"
            >
              ‹
            </button>
            <div className={styles.monthYear}>
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateMonth('next')}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className={styles.weekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.weekday}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {renderCalendar()}
          </div>

          {includeTime && (
            <div className={styles.timeSection}>
              <div className={styles.timeInputs}>
                <div className={styles.timeInputGroup}>
                  <label className={styles.timeLabel}>Hour</label>
                  <select
                    className={styles.timeSelect}
                    value={selectedTime.hours}
                    onChange={(e) => handleTimeChange('hours', parseInt(e.target.value))}
                  >
                    {timeFormat === '12' ? (
                      Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))
                    ) : (
                      Array.from({ length: 24 }, (_, i) => i).map(hour => (
                        <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className={styles.timeInputGroup}>
                  <label className={styles.timeLabel}>Minute</label>
                  <select
                    className={styles.timeSelect}
                    value={selectedTime.minutes}
                    onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value))}
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                      <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>

                {timeFormat === '12' && (
                  <div className={styles.timeInputGroup}>
                    <label className={styles.timeLabel}>AM/PM</label>
                    <select
                      className={styles.timeSelect}
                      value={selectedTime.ampm}
                      onChange={(e) => handleTimeChange('ampm', e.target.value as 'AM' | 'PM')}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.timeActions}>
                <Button
                  className={styles.applyButton}
                  onClick={handleApplyTime}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
