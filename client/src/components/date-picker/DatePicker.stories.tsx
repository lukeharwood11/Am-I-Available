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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories that need state
const DatePickerWithState = (args: any) => {
  const [value, setValue] = useState<string | null>(args.value || null);

  return <DatePicker {...args} value={value} onChange={setValue} />;
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
          placeholder='Start date'
          label='Start Date'
          maxDate={endDate || undefined}
        />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder='End date'
          label='End Date'
          minDate={startDate || undefined}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
