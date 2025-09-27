import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Button,
    DatePicker,
    Input,
    TimePicker,
    Text,
    Popover,
} from '../../components';
import Textarea from '../../components/textarea/TextArea';
import {
    CreateEventRequestRequest,
    EventDateTime,
} from '../../redux/types/event-requests.types';
import styles from './RequestForm.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Select from '../../components/select';
import {
    MdAutoAwesome,
    MdInfo,
    MdOutlineArrowBackIosNew,
    MdSave,
    MdDelete,
} from 'react-icons/md';
import { useReduxEventRequests } from '../../hooks/useReduxEventRequests';

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
    onDelete?: () => void;
    initialData?: Partial<CreateRequestFormData>;
    loading?: boolean;
}

export const RequestForm = ({
    isNew,
    onSave,
    onCancel,
    onDelete,
    initialData = {},
    loading = false,
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

    const {
        smartParseEventRequest,
        smartParseLoading,
        smartParseError,
        smartParseResult,
    } = useReduxEventRequests();

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
            const newStartDate = formData.start_date
                ? formData.start_date
                : date;
            setFormData(prev => ({
                ...prev,
                start_date: newStartDate,
                end_date: date,
            }));
        },
        [formData.start_date, formData.end_date]
    );

    const getTimeDelta = (
        time: string,
        timeIncrementMinutes: number
    ): string => {
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
        if (isAllDay || !timeString) {
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
        // if allDay is set to false, then there must be a start_time and end_time
        if (!allDay && (!formData.start_time || !formData.end_time)) {
            newErrors.start_time = 'Start time is required';
            newErrors.end_time = 'End time is required';
        }
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

    useEffect(() => {
        if (!smartParseResult) return;
        if (smartParseError) return;

        // Helper function to parse EventDateTime back to date and time strings
        const parseEventDateTime = (eventDateTime: EventDateTime) => {
            if (!eventDateTime) return { date: '', time: '' };

            // Handle all-day events (date field)
            if (eventDateTime.date) {
                return { date: eventDateTime.date.replace('T', ''), time: '' };
            }

            // Handle timed events (date_time field)
            if (eventDateTime.date_time) {
                const dateTimeString = eventDateTime.date_time;
                const [date, time] = dateTimeString.split('T');
                return { date: date || '', time: time || '' };
            }

            return { date: '', time: '' };
        };

        const startDateTime = parseEventDateTime(smartParseResult.start_date);
        const endDateTime = parseEventDateTime(smartParseResult.end_date);

        setFormData(prev => ({
            ...prev,
            title: smartParseResult.title || prev.title,
            location: smartParseResult.location || prev.location,
            description: smartParseResult.description || prev.description,
            start_date: startDateTime.date || prev.start_date,
            end_date: endDateTime.date || prev.end_date,
            start_time: startDateTime.time || prev.start_time,
            end_time: endDateTime.time || prev.end_time,
            notes: smartParseResult.notes || prev.notes,
            approvers: smartParseResult.approvers || prev.approvers,
        }));
    }, [smartParseResult]);

    const handleAutoFill = useCallback(async () => {
        await smartParseEventRequest({
            description: formData.description,
            current_date: new Date().toISOString(),
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
            title: formData.title,
            google_event_id: null,
            location: formData.location,
            notes: formData.notes,
            approvers: formData.approvers,
        });
    }, [formData.description]);

    return (
        <div className={styles.requestForm}>
            <div className={styles.formActions}>
                <Button
                    variant='secondary-subtle'
                    onClick={onCancel}
                    disabled={isSubmitting || loading}
                    leftIcon={<MdOutlineArrowBackIosNew />}
                    size='x-small'
                >
                    Back
                </Button>
                {!isNew && onDelete ? (
                    <Button
                        leftIcon={<MdDelete />}
                        variant='danger'
                        onClick={onDelete}
                        disabled={isSubmitting || loading}
                        size='x-small'
                    >
                        Delete
                    </Button>
                ) : (
                    <div />
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Title</label>
                <div className={styles.inputButtonRow}>
                    <Input
                        value={formData.title}
                        onChange={e =>
                            handleFieldChange('title', e.target.value)
                        }
                        placeholder='Enter event title'
                        fullWidth
                        variant={errors.title ? 'error' : 'default'}
                    />
                    <Button
                        variant='primary'
                        onClick={handleSave}
                        isLoading={isSubmitting}
                        disabled={isSubmitting || loading}
                        leftIcon={<MdSave />}
                    >
                        {isSubmitting
                            ? isNew
                                ? 'Creating...'
                                : 'Saving...'
                            : isNew
                              ? 'Create'
                              : 'Save'}
                    </Button>
                </div>
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
                    disabled={smartParseLoading || loading}
                />
                <Button
                    leftIcon={<MdAutoAwesome />}
                    variant='secondary-subtle'
                    onClick={handleAutoFill}
                    isLoading={smartParseLoading}
                >
                    Auto-Fill by Description
                </Button>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Location</label>
                <Input
                    value={formData.location}
                    onChange={e =>
                        handleFieldChange('location', e.target.value)
                    }
                    placeholder='Enter location'
                    fullWidth
                    disabled={smartParseLoading || loading}
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
                        disabled={smartParseLoading || loading}
                    />
                    {errors.start_date && (
                        <span className={styles.errorText}>
                            {errors.start_date}
                        </span>
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
                        disabled={smartParseLoading || loading}
                    />
                    {errors.end_date && (
                        <span className={styles.errorText}>
                            {errors.end_date}
                        </span>
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
                            disabled={smartParseLoading || loading}
                        />
                        {errors.start_time && (
                            <span className={styles.errorText}>
                                {errors.start_time}
                            </span>
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
                            disabled={smartParseLoading || loading}
                        />
                        {errors.end_time && (
                            <span className={styles.errorText}>
                                {errors.end_time}
                            </span>
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
                    disabled={smartParseLoading || loading}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>
                    Reviewers
                    <Popover
                        position='top'
                        trigger={<MdInfo />}
                        content={
                            <div>
                                Reviewers will be notified of the event and can
                                indicate approval of the event. If a reviewer is
                                required, once they approve the event, the event
                                will be created.
                            </div>
                        }
                    ></Popover>
                </label>
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
                    disabled={smartParseLoading || loading}
                />
                {formData.approvers.length > 0 && selectedApprover && (
                    <>
                        <Text variant='caption'>
                            {selectedApprover?.other_user.full_name} will be
                            notified of this event.{' '}
                            {formData.approvers[0]?.required
                                ? '(Required)'
                                : '(Optional)'}
                        </Text>
                        <div className={styles.checkboxRow}>
                            <input
                                type='checkbox'
                                checked={
                                    formData.approvers[0]?.required || false
                                }
                                onChange={e =>
                                    handleApproversChange(
                                        formData.approvers[0]?.user_id || null,
                                        e.target.checked
                                    )
                                }
                            />
                            <label className={styles.checkboxLabel}>
                                Required Review
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
