import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories that need state
const TimePickerWithState = (args: any) => {
  const [value, setValue] = useState<string | null>(args.value || null);

  return <TimePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: TimePickerWithState,
  args: {
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const WithValue: Story = {
  render: TimePickerWithState,
  args: {
    value: '14:30', // 2:30 PM
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const WithError: Story = {
  render: TimePickerWithState,
  args: {
    variant: 'error',
    error: 'Please select a valid time',
    placeholder: 'Select a time',
    label: 'Time',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '14:30',
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const Required: Story = {
  render: TimePickerWithState,
  args: {
    required: true,
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const Small: Story = {
  render: TimePickerWithState,
  args: {
    size: 'small',
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const Large: Story = {
  render: TimePickerWithState,
  args: {
    size: 'large',
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const FullWidth: Story = {
  render: TimePickerWithState,
  args: {
    fullWidth: true,
    placeholder: 'Select a time',
    label: 'Time',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithoutLabel: Story = {
  render: TimePickerWithState,
  args: {
    placeholder: 'Select a time',
  },
};

export const CustomPlaceholder: Story = {
  render: TimePickerWithState,
  args: {
    placeholder: 'Choose your preferred time',
    label: 'Preferred Time',
  },
};

// Multiple time pickers example
export const MultipleTimePickers: Story = {
  render: () => {
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <TimePicker
          value={startTime}
          onChange={setStartTime}
          placeholder='Start time'
          label='Start Time'
        />
        <TimePicker
          value={endTime}
          onChange={setEndTime}
          placeholder='End time'
          label='End Time'
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// Combined Date and Time pickers example
export const DateAndTimePickers: Story = {
  render: () => {
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <div>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Date & Time Selection
          </label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <DatePicker
                value={date}
                onChange={setDate}
                placeholder='Select date'
                label='Date'
                fullWidth
              />
            </div>
            <div style={{ flex: 1 }}>
              <TimePicker
                value={time}
                onChange={setTime}
                placeholder='Select time'
                label='Time'
                fullWidth
              />
            </div>
          </div>
        </div>
        {(date || time) && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <strong>Selected:</strong> {date || 'No date'} {time || 'No time'}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
