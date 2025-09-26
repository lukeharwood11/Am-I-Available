import { EventDateTime } from '../redux/types/event-requests.types';

/**
 * Creates a date object that treats the input as if it's in the specified timezone
 * This is useful when the server sends UTC time but it should be displayed in the event's timezone
 */
const createDateInTimezone = (
    dateTimeString: string,
    timeZone?: string
): Date => {
    // If the string ends with 'Z' (UTC), we need to treat it as if it's in the target timezone
    if (dateTimeString.endsWith('Z') && timeZone) {
        // Remove the 'Z' and create a date as if it's in the local timezone
        const localTimeString = dateTimeString.slice(0, -1);
        return new Date(localTimeString);
    }

    // Otherwise, create the date normally
    return new Date(dateTimeString);
};

/**
 * Formats an EventDateTime object with proper timezone handling
 * @param dateTime - The EventDateTime object to format
 * @returns Formatted date string or 'Not specified' if invalid
 */
export const formatDateTime = (dateTime: EventDateTime): string => {
    if (!dateTime) return 'Not specified';

    const formatOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    if (dateTime.date) {
        // All-day event
        return new Date(dateTime.date).toLocaleDateString(
            'en-US',
            formatOptions
        );
    } else if (dateTime.date_time) {
        // Timed event - use timezone if available
        const options: Intl.DateTimeFormatOptions = {
            ...formatOptions,
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
        };

        // Use the timezone from the event if available, otherwise use browser's local timezone
        if (dateTime.time_zone) {
            options.timeZone = dateTime.time_zone;
        }

        try {
            // Create date object that treats the time as if it's in the target timezone
            const date = createDateInTimezone(
                dateTime.date_time,
                dateTime.time_zone || undefined
            );
            return date.toLocaleString('en-US', options);
        } catch (error) {
            console.error('Error formatting date with timezone:', error, {
                dateTime: dateTime.date_time,
                timeZone: dateTime.time_zone,
            });
            // Fallback to basic formatting without timezone
            return new Date(dateTime.date_time).toLocaleString('en-US', {
                ...formatOptions,
                hour: 'numeric',
                minute: '2-digit',
            });
        }
    }

    return 'Not specified';
};

/**
 * Formats an EventDateTime object for display in lists (shorter format)
 * @param dateTime - The EventDateTime object to format
 * @returns Formatted date string or 'Not specified' if invalid
 */
export const formatDateTimeShort = (dateTime: EventDateTime): string => {
    if (!dateTime) return 'Not specified';

    const formatOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
    };

    if (dateTime.date) {
        // All-day event
        return new Date(dateTime.date).toLocaleDateString(
            'en-US',
            formatOptions
        );
    } else if (dateTime.date_time) {
        // Timed event - use timezone if available
        const options: Intl.DateTimeFormatOptions = {
            ...formatOptions,
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
        };

        // Use the timezone from the event if available, otherwise use browser's local timezone
        if (dateTime.time_zone) {
            options.timeZone = dateTime.time_zone;
        }

        try {
            // Create date object that treats the time as if it's in the target timezone
            const date = createDateInTimezone(
                dateTime.date_time,
                dateTime.time_zone || undefined
            );
            return date.toLocaleString('en-US', options);
        } catch (error) {
            console.error('Error formatting date with timezone:', error, {
                dateTime: dateTime.date_time,
                timeZone: dateTime.time_zone,
            });
            // Fallback to basic formatting without timezone
            return new Date(dateTime.date_time).toLocaleString('en-US', {
                ...formatOptions,
                hour: 'numeric',
                minute: '2-digit',
            });
        }
    }

    return 'Not specified';
};
