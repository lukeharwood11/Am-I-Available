import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Icons/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text-based logo component using HTML h1 element with CSS modules for styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 128, step: 8 },
      description: 'Controls the overall size of the logo (affects font size)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const Medium: Story = {
  args: {
    size: 32,
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 64,
  },
};

export const WithDifferentColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', color: '#4a90e2' }}>
        <Logo size={32} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Primary Blue</p>
      </div>
      <div style={{ textAlign: 'center', color: '#8e44ad' }}>
        <Logo size={32} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
          Secondary Purple
        </p>
      </div>
      <div style={{ textAlign: 'center', color: '#262626' }}>
        <Logo size={32} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Dark Grey</p>
      </div>
      <div style={{ textAlign: 'center', color: '#ff6b6b' }}>
        <Logo size={32} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Danger Red</p>
      </div>
    </div>
  ),
};
