import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underlined', 'pills'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 100%)',
        minHeight: '400px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample tabs data with app-like styling
const sampleTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Profile',
    content: (
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 500, color: 'var(--grey-800)' }}>Profile Information</h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          Manage your personal information and account settings.
        </p>
        <p style={{ margin: '0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          This is where you can update your name, email, profile picture, and other personal details.
        </p>
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Settings',
    content: (
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 500, color: 'var(--grey-800)' }}>Account Settings</h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          Configure your account preferences and privacy settings.
        </p>
        <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          <li>Privacy settings</li>
          <li>Notification preferences</li>
          <li>Security options</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'tab3',
    label: 'Notifications',
    content: (
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 500, color: 'var(--grey-800)' }}>Notification Settings</h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          Control how and when you receive notifications.
        </p>
        <p style={{ margin: '0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          Choose from email, push, and in-app notification options.
        </p>
      </div>
    ),
  },
  {
    id: 'tab4',
    label: 'Disabled Tab',
    content: <div style={{ padding: '24px' }}>This content should not be accessible</div>,
    disabled: true,
  },
];

// Interactive wrapper component for stories
const TabsWrapper: React.FC<{ tabs: TabItem[]; defaultActiveId?: string; variant?: 'default' | 'underlined' | 'pills'; size?: 'small' | 'medium' | 'large'; fullWidth?: boolean }> = ({ 
  tabs, 
  defaultActiveId = tabs[0]?.id, 
  variant = 'default',
  size = 'medium',
  fullWidth = false
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultActiveId);
  
  return (
    <Tabs
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
    />
  );
};

export const Default: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} />,
};

export const Underlined: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} variant="underlined" />,
};

export const Pills: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} variant="pills" />,
};

export const Small: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} size="small" />,
};

export const Large: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} size="large" />,
};

export const FullWidth: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} fullWidth />,
};

export const FullWidthUnderlined: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} variant="underlined" fullWidth />,
};

export const FullWidthPills: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} variant="pills" fullWidth />,
};

// Tab with complex content matching app styling
const complexTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '24px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 500, color: 'var(--primary)' }}>Dashboard Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ 
            padding: '20px', 
            background: 'white',
            border: '1px solid var(--grey-200)',
            borderRadius: 'var(--border-radius-standard)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 500, color: 'var(--grey-600)' }}>Total Users</h4>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 600, color: 'var(--primary)' }}>1,234</p>
          </div>
          <div style={{ 
            padding: '20px', 
            background: 'white',
            border: '1px solid var(--grey-200)',
            borderRadius: 'var(--border-radius-standard)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', fontWeight: 500, color: 'var(--grey-600)' }}>Active Sessions</h4>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 600, color: 'var(--secondary)' }}>89</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: (
      <div style={{ padding: '24px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 500, color: 'var(--secondary)' }}>Analytics Report</h2>
        <p style={{ margin: '0 0 20px 0', color: 'var(--grey-600)', lineHeight: 1.6 }}>
          Detailed analytics and performance metrics would be displayed here.
        </p>
        <div style={{ 
          height: '200px', 
          background: 'var(--grey-100)', 
          borderRadius: 'var(--border-radius-standard)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid var(--grey-200)'
        }}>
          <p style={{ color: 'var(--grey-600)', fontStyle: 'italic' }}>Chart placeholder</p>
        </div>
      </div>
    ),
  },
  {
    id: 'reports',
    label: 'Reports',
    content: (
      <div style={{ padding: '24px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', fontWeight: 500, color: 'var(--grey-800)' }}>Generated Reports</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            padding: '16px', 
            border: '1px solid var(--grey-200)', 
            borderRadius: 'var(--border-radius-standard)',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <strong style={{ color: 'var(--grey-800)' }}>Monthly Report - September 2024</strong>
            <p style={{ margin: '8px 0 0 0', color: 'var(--grey-600)', fontSize: '0.875rem' }}>Generated on Sep 14, 2024</p>
          </div>
          <div style={{ 
            padding: '16px', 
            border: '1px solid var(--grey-200)', 
            borderRadius: 'var(--border-radius-standard)',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <strong style={{ color: 'var(--grey-800)' }}>Quarterly Summary - Q3 2024</strong>
            <p style={{ margin: '8px 0 0 0', color: 'var(--grey-600)', fontSize: '0.875rem' }}>Generated on Sep 10, 2024</p>
          </div>
        </div>
      </div>
    ),
  },
];

export const ComplexContent: Story = {
  render: () => <TabsWrapper tabs={complexTabs} variant="underlined" />,
};

// Two tabs only with app styling
const twoTabs: TabItem[] = [
  {
    id: 'login',
    label: 'Login',
    content: (
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 500, color: 'var(--grey-800)' }}>Login to your account</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)', lineHeight: 1.6 }}>Enter your credentials to access your account.</p>
      </div>
    ),
  },
  {
    id: 'signup',
    label: 'Sign Up',
    content: (
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 500, color: 'var(--grey-800)' }}>Create a new account</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)', lineHeight: 1.6 }}>Fill out the form below to create your account.</p>
      </div>
    ),
  },
];

export const TwoTabs: Story = {
  render: () => <TabsWrapper tabs={twoTabs} variant="pills" />,
};

// With disabled tab active by default (should fallback to first available)
export const WithDisabledTabs: Story = {
  render: () => <TabsWrapper tabs={sampleTabs} defaultActiveId="tab1" />,
};
