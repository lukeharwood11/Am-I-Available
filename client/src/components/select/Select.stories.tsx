import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import type { SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const difficultyOptions: SelectOption[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const colorOptions: SelectOption[] = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow', disabled: true },
  { value: 'purple', label: 'Purple' },
];

export const Default: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    value: 'medium',
  },
};

export const Small: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    size: 'small',
    value: '',
  },
};

export const Large: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    size: 'large',
    value: '',
  },
};

export const FullWidth: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    fullWidth: true,
    value: '',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Error: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    variant: 'error',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    disabled: true,
    value: 'medium',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: colorOptions,
    placeholder: 'Select a color',
    value: '',
  },
};

export const Required: Story = {
  args: {
    options: difficultyOptions,
    placeholder: 'Select difficulty',
    required: true,
    value: '',
  },
};
