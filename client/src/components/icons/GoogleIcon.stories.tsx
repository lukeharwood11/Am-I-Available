import type { Meta, StoryObj } from '@storybook/react';
import GoogleIcon from './GoogleIcon';

const meta: Meta<typeof GoogleIcon> = {
    title: 'Components/Icons/GoogleIcon',
    component: GoogleIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'range', min: 12, max: 64, step: 2 },
        },
        className: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 18,
    },
};

export const Small: Story = {
    args: {
        size: 16,
    },
};

export const Medium: Story = {
    args: {
        size: 24,
    },
};

export const Large: Story = {
    args: {
        size: 32,
    },
};

export const ExtraLarge: Story = {
    args: {
        size: 48,
    },
};

export const SizeComparison: Story = {
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
            <div style={{ textAlign: 'center' }}>
                <GoogleIcon size={16} />
                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>16px</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <GoogleIcon size={18} />
                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
                    18px (Default)
                </p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <GoogleIcon size={24} />
                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>24px</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <GoogleIcon size={32} />
                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>32px</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <GoogleIcon size={48} />
                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>48px</p>
            </div>
        </div>
    ),
};

export const InButton: Story = {
    name: 'In Button Context',
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
                padding: '20px',
            }}
        >
            <button
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                <GoogleIcon size={18} />
                Sign in with Google
            </button>

            <button
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    border: '1px solid #4285F4',
                    borderRadius: '6px',
                    background: '#4285F4',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                <GoogleIcon size={20} />
                Continue with Google
            </button>
        </div>
    ),
};
