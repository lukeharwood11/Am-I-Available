import { Button, DatePicker, Input, Modal } from '../../components';
import {
  CreateEventRequestRequest,
  EventDateTime,
} from '../../redux/types/event-requests.types';
import { useState } from 'react';
import styles from './CreateRequestModal.module.css';

export interface CreateRequestFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  notes: string;
}

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCreated: (request: CreateEventRequestRequest) => void;
}

export const CreateRequestModal = ({
  isOpen,
  onClose,
  onRequestCreated,
}: CreateRequestModalProps) => {
  const [formData, setFormData] = useState<CreateRequestFormData>({
    title: '' as string,
    location: '' as string,
    description: '' as string,
    start_date: '' as string,
    end_date: '' as string,
    notes: '' as string,
  });

  // Helper function to convert string date to EventDateTime
  const stringToEventDateTime = (dateString: string): EventDateTime => {
    if (!dateString) {
      return { date: null, dateTime: null, timeZone: null };
    }

    // Check if it's a date-only string (YYYY-MM-DD) or datetime string
    if (dateString.includes('T') || dateString.includes(' ')) {
      // It's a datetime string
      return {
        date: null,
        dateTime: dateString,
        timeZone: 'UTC', // Default timezone, could be made configurable
      };
    } else {
      // It's a date-only string
      return {
        date: dateString,
        dateTime: null,
        timeZone: null,
      };
    }
  };

  const handleCreateRequest = async () => {
    const request: CreateEventRequestRequest = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      notes: formData.notes,
      start_date: stringToEventDateTime(formData.start_date),
      end_date: stringToEventDateTime(formData.end_date),
      importance_level: 1,
    };

    await onRequestCreated(request);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create Request'>
      <div className={styles.createRequestModal}>
        <Input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder='Enter title'
          fullWidth
        />
        <Input
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder='Enter description'
          fullWidth
        />
        <DatePicker
          value={formData.start_date}
          onChange={date =>
            setFormData({ ...formData, start_date: date || '' })
          }
          placeholder='Enter start date'
          fullWidth
        />
        <DatePicker
          value={formData.end_date}
          onChange={date => setFormData({ ...formData, end_date: date || '' })}
          placeholder='Enter end date'
          fullWidth
        />
        <Input
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          placeholder='Enter location'
          fullWidth
        />
        <Input
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          placeholder='Enter notes'
          fullWidth
        />
        <Button onClick={handleCreateRequest}>Create Request</Button>
      </div>
    </Modal>
  );
};
