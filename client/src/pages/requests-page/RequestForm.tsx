import React, { useCallback, useMemo, useState } from 'react';
import { Button, DatePicker, Input, TimePicker, Text } from '../../components';
import Textarea from '../../components/textarea/TextArea';
import {
  CreateEventRequestRequest,
  EventDateTime,
} from '../../redux/types/event-requests.types';
import styles from './RequestForm.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Select from '../../components/select';

export interface Approver {
  user_id: string;
  required: boolean;
}

export interface CreateRequestFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  notes: string;
  start_time: string;
  end_time: string;
  approvers: Approver[];
}

interface FormErrors {
  title?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
}

interface RequestFormProps {
  isNew: boolean;
  onSave: (request: CreateEventRequestRequest) => void;
  onCancel: () => void;
  initialData?: Partial<CreateRequestFormData>;
}

export const RequestForm = ({
  isNew,
  onSave,
  onCancel,
  initialData = {},
}: RequestFormProps) => {
  const [allDay, setAllDay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const relationships = useSelector(
    (state: RootState) => state.relationships.relationships
  );
  const [formData, setFormData] = useState<CreateRequestFormData>({
    title: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    notes: '',
    start_time: '',
    end_time: '',
    approvers: [],
    ...initialData,
  });
  const selectedApprover = useMemo(() => {
    return relationships.find(
      relationship =>
        relationship.other_user.id === formData.approvers[0]?.user_id
    );
  }, [relationships, formData.approvers, formData.approvers[0]?.user_id]);

  const handleStartDateChange = useCallback(
    (date: string) => {
      const newEndDate = formData.end_date ? formData.end_date : date;
      setFormData(prev => ({
        ...prev,
        end_date: newEndDate,
        start_date: date,
      }));
    },
    [formData.start_date, formData.end_date]
  );

  const handleEndDateChange = useCallback(
    (date: string) => {
      const newStartDate = formData.start_date ? formData.start_date : date;
      setFormData(prev => ({
        ...prev,
        start_date: newStartDate,
        end_date: date,
      }));
    },
    [formData.start_date, formData.end_date]
  );

  const getTimeDelta = (time: string, timeIncrementMinutes: number): string => {
    if (!time) return '';

    // Parse the time string (format: HH:MM)
    let [hours, minutes] = time.split(':').map(Number);

    if (hours === undefined || minutes === undefined) {
      return '';
    }

    // Create a date object for today with the given time
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    // Add the specified minutes
    date.setMinutes(date.getMinutes() + timeIncrementMinutes);

    // Format back to HH:MM
    const newHours = date.getHours().toString().padStart(2, '0');
    const newMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${newHours}:${newMinutes}`;
  };

  const handleStartTimeChange = useCallback(
    (time: string) => {
      const newEndTime = formData.end_time
        ? formData.end_time
        : getTimeDelta(time, 15);
      setFormData(prev => ({
        ...prev,
        end_time: newEndTime,
        start_time: time,
      }));
    },
    [formData.start_time, formData.end_time]
  );

  const handleEndTimeChange = useCallback(
    (time: string) => {
      const newStartTime = formData.start_time
        ? formData.start_time
        : getTimeDelta(time, -15);
      setFormData(prev => ({
        ...prev,
        start_time: newStartTime,
        end_time: time,
      }));
    },
    [formData.start_time, formData.end_time]
  );

  // Helper function to convert string date to EventDateTime
  const stringToEventDateTime = (
    dateString: string,
    timeString: string,
    isAllDay: boolean
  ): EventDateTime => {
    if (!dateString) {
      return { date: null, date_time: null, time_zone: null };
    }

    const combinedDateTime = `${dateString}T${timeString}`;

    // get the current timezone of the user
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log('combinedDateTime', combinedDateTime);
    console.log('timezone', timezone);
    if (isAllDay) {
      return {
        date: dateString,
        time_zone: timezone,
      };
    } else {
      return {
        date: null,
        date_time: combinedDateTime,
        time_zone: timezone,
      };
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    // TODO: Validate the form
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const request: CreateEventRequestRequest = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        notes: formData.notes,
        start_date: stringToEventDateTime(
          formData.start_date,
          formData.start_time,
          allDay
        ),
        end_date: stringToEventDateTime(
          formData.end_date,
          formData.end_time,
          allDay
        ),
        importance_level: 1,
        approvers: formData.approvers.map(approver => ({
          user_id: approver.user_id,
          required: approver.required,
        })),
      };

      await onSave(request);
    } catch (error) {
      console.error('Error saving request:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, allDay, onSave]);

  const handleAllDayToggle = (checked: boolean) => {
    setAllDay(checked);
    if (checked) {
      // Clear time fields when switching to all day
      setFormData(prev => ({
        ...prev,
        start_time: '',
        end_time: '',
      }));
      // Clear time errors
      setErrors(prev => ({
        ...prev,
        start_time: undefined,
        end_time: undefined,
      }));
    }
  };

  const handleFieldChange = (
    field: keyof CreateRequestFormData,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleApproversChange = (value: string | null, required: boolean) => {
    setFormData(prev => ({
      ...prev,
      approvers: value
        ? [
            {
              user_id: value,
              required: required || prev.approvers.length === 0,
            },
          ]
        : [],
    }));
  };

  return (
    <div className={styles.requestForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <Input
          value={formData.title}
          onChange={e => handleFieldChange('title', e.target.value)}
          placeholder='Enter event title'
          fullWidth
          variant={errors.title ? 'error' : 'default'}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <Textarea
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleFieldChange('description', e.target.value)
          }
          placeholder='Describe your event...'
          fullWidth
          rows={2}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Location</label>
        <Input
          value={formData.location}
          onChange={e => handleFieldChange('location', e.target.value)}
          placeholder='Enter location'
          fullWidth
        />
      </div>

      <div className={styles.dateTimeRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Start Date</label>
          <DatePicker
            value={formData.start_date}
            onChange={date => handleStartDateChange(date || '')}
            placeholder='Start date'
            fullWidth
            variant={errors.start_date ? 'error' : 'default'}
            minDate={new Date().toISOString().split('T')[0]}
          />
          {errors.start_date && (
            <span className={styles.errorText}>{errors.start_date}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>End Date</label>
          <DatePicker
            value={formData.end_date}
            onChange={date => handleEndDateChange(date || '')}
            placeholder='End date'
            fullWidth
            variant={errors.end_date ? 'error' : 'default'}
            minDate={
              formData.start_date || new Date().toISOString().split('T')[0]
            }
          />
          {errors.end_date && (
            <span className={styles.errorText}>{errors.end_date}</span>
          )}
        </div>
      </div>

      {!allDay && (
        <div className={styles.dateTimeRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Time</label>
            <TimePicker
              value={formData.start_time}
              onChange={time => handleStartTimeChange(time || '')}
              placeholder='Start time'
              fullWidth
              variant={errors.start_time ? 'error' : 'default'}
            />
            {errors.start_time && (
              <span className={styles.errorText}>{errors.start_time}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>End Time</label>
            <TimePicker
              value={formData.end_time}
              onChange={time => handleEndTimeChange(time || '')}
              placeholder='End time'
              fullWidth
              variant={errors.end_time ? 'error' : 'default'}
            />
            {errors.end_time && (
              <span className={styles.errorText}>{errors.end_time}</span>
            )}
          </div>
        </div>
      )}

      <div className={styles.allDayToggle}>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            checked={allDay}
            onChange={e => handleAllDayToggle(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>All day event</span>
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Notes</label>
        <Textarea
          value={formData.notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleFieldChange('notes', e.target.value)
          }
          placeholder='Additional notes...'
          fullWidth
          rows={2}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Approvers</label>
        <Select
          fullWidth
          options={relationships.map(relationship => ({
            value: relationship.other_user.id,
            label: `${relationship.other_user.full_name} (${relationship.other_user.email})`,
          }))}
          value={formData.approvers[0]?.user_id || ''}
          onChange={value =>
            handleApproversChange(
              value,
              formData.approvers[0]?.required || false
            )
          }
        />
        {formData.approvers.length > 0 && selectedApprover && (
          <>
            <Text variant='caption'>
              {selectedApprover?.other_user.full_name} will be notified of this
              event.{' '}
              {formData.approvers[0]?.required ? '(Required)' : '(Optional)'}
            </Text>
            <div className={styles.checkboxRow}>
              <input
                type='checkbox'
                checked={formData.approvers[0]?.required || false}
                onChange={e =>
                  handleApproversChange(
                    formData.approvers[0]?.user_id || null,
                    e.target.checked
                  )
                }
              />
              <label className={styles.checkboxLabel}>Required Approval</label>
            </div>
          </>
        )}
      </div>

      <div className={styles.formActions}>
        <Button
          variant='secondary-subtle'
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={handleSave}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isNew
              ? 'Creating...'
              : 'Saving...'
            : isNew
              ? 'Create Request'
              : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};
