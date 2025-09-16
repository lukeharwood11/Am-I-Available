import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
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
    includeTime: {
      control: { type: 'boolean' },
    },
    timeFormat: {
      control: { type: 'select' },
      options: ['12', '24'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories that need state
const DatePickerWithState = (args: any) => {
  const [value, setValue] = useState<string | null>(args.value || null);
  
  return (
    <DatePicker
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const WithValue: Story = {
  render: DatePickerWithState,
  args: {
    value: new Date(2024, 11, 25).toISOString(), // December 25, 2024
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const WithError: Story = {
  render: DatePickerWithState,
  args: {
    variant: 'error',
    error: 'Please select a valid date',
    placeholder: 'Select a date',
    label: 'Date',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2024, 11, 25).toISOString(),
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const Required: Story = {
  render: DatePickerWithState,
  args: {
    required: true,
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const Small: Story = {
  render: DatePickerWithState,
  args: {
    size: 'small',
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const Large: Story = {
  render: DatePickerWithState,
  args: {
    size: 'large',
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const FullWidth: Story = {
  render: DatePickerWithState,
  args: {
    fullWidth: true,
    placeholder: 'Select a date',
    label: 'Date',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithMinMaxDate: Story = {
  render: DatePickerWithState,
  args: {
    minDate: new Date(2024, 0, 1).toISOString(), // January 1, 2024
    maxDate: new Date(2024, 11, 31).toISOString(), // December 31, 2024
    placeholder: 'Select a date in 2024',
    label: 'Date (2024 only)',
  },
};

export const WithoutLabel: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select a date',
  },
};

export const CustomPlaceholder: Story = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Choose your preferred date',
    label: 'Preferred Date',
  },
};

// Time selection stories
export const WithTime24Hour: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '24',
    placeholder: 'Select date and time',
    label: 'Date & Time (24h)',
  },
};

export const WithTime12Hour: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '12',
    placeholder: 'Select date and time',
    label: 'Date & Time (12h)',
  },
};

export const WithTimeAndValue: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '24',
    value: new Date(2024, 11, 25, 14, 30).toISOString(), // December 25, 2024 at 2:30 PM
    placeholder: 'Select date and time',
    label: 'Date & Time',
  },
};

export const WithTimeSmall: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '12',
    size: 'small',
    placeholder: 'Select date and time',
    label: 'Date & Time (Small)',
  },
};

export const WithTimeLarge: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '24',
    size: 'large',
    placeholder: 'Select date and time',
    label: 'Date & Time (Large)',
  },
};

export const WithTimeError: Story = {
  render: DatePickerWithState,
  args: {
    includeTime: true,
    timeFormat: '12',
    variant: 'error',
    error: 'Please select a valid date and time',
    placeholder: 'Select date and time',
    label: 'Date & Time',
    required: true,
  },
};

// Multiple date pickers example
export const MultipleDatePickers: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="Start date"
          label="Start Date"
          maxDate={endDate || undefined}
        />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder="End date"
          label="End Date"
          minDate={startDate || undefined}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// Multiple date-time pickers example
export const MultipleDateTimePickers: Story = {
  render: () => {
    const [startDateTime, setStartDateTime] = useState<string | null>(null);
    const [endDateTime, setEndDateTime] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <DatePicker
          value={startDateTime}
          onChange={setStartDateTime}
          includeTime={true}
          timeFormat="24"
          placeholder="Start date and time"
          label="Start Date & Time"
          maxDate={endDateTime || undefined}
        />
        <DatePicker
          value={endDateTime}
          onChange={setEndDateTime}
          includeTime={true}
          timeFormat="24"
          placeholder="End date and time"
          label="End Date & Time"
          minDate={startDateTime || undefined}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
