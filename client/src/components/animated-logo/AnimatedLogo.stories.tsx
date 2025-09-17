import type { Meta, StoryObj } from '@storybook/react';
import AnimatedLogo from './AnimatedLogo';

const meta: Meta<typeof AnimatedLogo> = {
  title: 'Components/AnimatedLogo',
  component: AnimatedLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated logo that displays "AM I AVAILABLE" initially and then transitions to "AMIA" after 3 seconds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    className: {
      control: 'text',
      description: 'Additional CSS class name to apply to the logo container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-logo-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'AnimatedLogo with a custom CSS class applied.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    onClick: () => alert('Logo clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'AnimatedLogo with click interaction. Click the logo to see the alert.',
      },
    },
  },
};
