import type { Meta, StoryObj } from '@storybook/react';
import LoadingIcon from './LoadingIcon';

const meta: Meta<typeof LoadingIcon> = {
  title: 'Components/Icons/LoadingIcon',
  component: LoadingIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text-based loading icon with CSS animation. Uses HTML div and span elements with CSS modules for styling and animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 128, step: 8 },
      description: 'Controls the overall size of the loading icon (affects font size and animation outline)',
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
    size: 32,
  },
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Medium: Story = {
  args: {
    size: 48,
  },
};

export const Large: Story = {
  args: {
    size: 64,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 96,
  },
};

export const WithDifferentColors: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      alignItems: 'center', 
      flexWrap: 'wrap',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', color: '#4a90e2' }}>
        <LoadingIcon size={48} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Primary Blue</p>
      </div>
      <div style={{ textAlign: 'center', color: '#8e44ad' }}>
        <LoadingIcon size={48} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Secondary Purple</p>
      </div>
      <div style={{ textAlign: 'center', color: '#262626' }}>
        <LoadingIcon size={48} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Dark Grey</p>
      </div>
      <div style={{ textAlign: 'center', color: '#ff6b6b' }}>
        <LoadingIcon size={48} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Danger Red</p>
      </div>
    </div>
  ),
};

export const Animation: Story = {
  name: 'Animation Demo',
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '20px', 
      alignItems: 'center', 
      padding: '20px'
    }}>
      <h3 style={{ margin: 0, color: '#4a90e2' }}>Loading Animation</h3>
      <LoadingIcon size={64} />
      <p style={{ margin: 0, fontSize: '14px', color: '#666', textAlign: 'center' }}>
        The outline animates in a continuous loop
      </p>
    </div>
  ),
};