import type { Meta, StoryObj } from '@storybook/react';
import Pill from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Pill',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Pill color="primary">Primary</Pill>
      <Pill color="secondary">Secondary</Pill>
      <Pill color="danger">Danger</Pill>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Pill variant="filled">Filled</Pill>
      <Pill variant="outlined">Outlined</Pill>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Pill size="small">Small</Pill>
      <Pill size="medium">Medium</Pill>
      <Pill size="large">Large</Pill>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Pill leftIcon="🎯">With Left Icon</Pill>
      <Pill rightIcon="✨">With Right Icon</Pill>
      <Pill leftIcon="🎯" rightIcon="✨">Both Icons</Pill>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Pill color="primary" variant="filled" size="small">Small Filled</Pill>
          <Pill color="primary" variant="filled" size="medium">Medium Filled</Pill>
          <Pill color="primary" variant="filled" size="large">Large Filled</Pill>
          <Pill color="primary" variant="outlined" size="small">Small Outlined</Pill>
          <Pill color="primary" variant="outlined" size="medium">Medium Outlined</Pill>
          <Pill color="primary" variant="outlined" size="large">Large Outlined</Pill>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Pill color="secondary" variant="filled" size="small">Small Filled</Pill>
          <Pill color="secondary" variant="filled" size="medium">Medium Filled</Pill>
          <Pill color="secondary" variant="filled" size="large">Large Filled</Pill>
          <Pill color="secondary" variant="outlined" size="small">Small Outlined</Pill>
          <Pill color="secondary" variant="outlined" size="medium">Medium Outlined</Pill>
          <Pill color="secondary" variant="outlined" size="large">Large Outlined</Pill>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Danger</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Pill color="danger" variant="filled" size="small">Small Filled</Pill>
          <Pill color="danger" variant="filled" size="medium">Medium Filled</Pill>
          <Pill color="danger" variant="filled" size="large">Large Filled</Pill>
          <Pill color="danger" variant="outlined" size="small">Small Outlined</Pill>
          <Pill color="danger" variant="outlined" size="medium">Medium Outlined</Pill>
          <Pill color="danger" variant="outlined" size="large">Large Outlined</Pill>
        </div>
      </div>
    </div>
  ),
};
