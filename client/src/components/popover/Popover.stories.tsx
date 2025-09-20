import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import Button from '../button/Button';
import Text from '../text/Text';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: { type: 'select' },
            options: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end',
            ],
        },
        closeOnClickOutside: {
            control: { type: 'boolean' },
        },
        closeOnEscape: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicContent = () => (
    <div>
        <Text variant='body-medium'>This is a basic popover content.</Text>
        <Text
            variant='body-small'
            style={{ marginTop: '8px', color: 'var(--grey-600)' }}
        >
            Click outside to close.
        </Text>
    </div>
);

const RichContent = () => (
    <div style={{ minWidth: '200px' }}>
        <Text variant='heading-small' style={{ marginBottom: '8px' }}>
            Popover Title
        </Text>
        <Text variant='body-medium' style={{ marginBottom: '12px' }}>
            This is a more complex popover with multiple elements and actions.
        </Text>
        <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
        >
            <Button variant='secondary-subtle' size='small'>
                Cancel
            </Button>
            <Button variant='primary' size='small'>
                Confirm
            </Button>
        </div>
    </div>
);

export const Default: Story = {
    args: {
        trigger: <Button>Click me</Button>,
        content: <BasicContent />,
        position: 'bottom',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const WithRichContent: Story = {
    args: {
        trigger: <Button variant='primary'>Open Popover</Button>,
        content: <RichContent />,
        position: 'bottom',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const TopPosition: Story = {
    args: {
        trigger: <Button variant='secondary'>Top Position</Button>,
        content: <BasicContent />,
        position: 'top',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const RightPosition: Story = {
    args: {
        trigger: <Button variant='alternate'>Right Position</Button>,
        content: <BasicContent />,
        position: 'right',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const LeftPosition: Story = {
    args: {
        trigger: <Button variant='alternate-subtle'>Left Position</Button>,
        content: <BasicContent />,
        position: 'left',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        trigger: <Button variant='danger'>Disabled Popover</Button>,
        content: <BasicContent />,
        position: 'bottom',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: true,
    },
};

export const NoClickOutsideClose: Story = {
    args: {
        trigger: <Button variant='primary-subtle'>No Outside Close</Button>,
        content: (
            <div>
                <Text variant='body-medium'>
                    This popover won't close when clicking outside.
                </Text>
                <Text
                    variant='body-small'
                    style={{ marginTop: '8px', color: 'var(--grey-600)' }}
                >
                    Press Escape or click the trigger again to close.
                </Text>
            </div>
        ),
        position: 'bottom',
        closeOnClickOutside: false,
        closeOnEscape: true,
        disabled: false,
    },
};

export const CustomTrigger: Story = {
    args: {
        trigger: (
            <div
                style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--subtle-primary)',
                    borderRadius: 'var(--border-radius-standard)',
                    cursor: 'pointer',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    fontSize: '14px',
                    fontWeight: '500',
                }}
            >
                Custom Trigger
            </div>
        ),
        content: <BasicContent />,
        position: 'bottom',
        closeOnClickOutside: true,
        closeOnEscape: true,
        disabled: false,
    },
};

export const AllPositions: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                padding: '40px',
            }}
        >
            <Popover
                trigger={<Button size='small'>Top</Button>}
                content={<BasicContent />}
                position='top'
            />
            <Popover
                trigger={<Button size='small'>Top Start</Button>}
                content={<BasicContent />}
                position='top-start'
            />
            <Popover
                trigger={<Button size='small'>Top End</Button>}
                content={<BasicContent />}
                position='top-end'
            />
            <Popover
                trigger={<Button size='small'>Left</Button>}
                content={<BasicContent />}
                position='left'
            />
            <Popover
                trigger={<Button size='small'>Center</Button>}
                content={<BasicContent />}
                position='bottom'
            />
            <Popover
                trigger={<Button size='small'>Right</Button>}
                content={<BasicContent />}
                position='right'
            />
            <Popover
                trigger={<Button size='small'>Bottom Start</Button>}
                content={<BasicContent />}
                position='bottom-start'
            />
            <Popover
                trigger={<Button size='small'>Bottom</Button>}
                content={<BasicContent />}
                position='bottom'
            />
            <Popover
                trigger={<Button size='small'>Bottom End</Button>}
                content={<BasicContent />}
                position='bottom-end'
            />
        </div>
    ),
    parameters: {
        layout: 'padded',
    },
};

export const SmoothAnimations: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '20px',
                padding: '40px',
                justifyContent: 'center',
            }}
        >
            <Popover
                trigger={<Button variant='primary'>Smooth Top</Button>}
                content={
                    <div>
                        <Text variant='body-medium'>
                            Smooth animation from top!
                        </Text>
                        <Text
                            variant='body-small'
                            style={{
                                marginTop: '8px',
                                color: 'var(--grey-600)',
                            }}
                        >
                            Powered by Framer Motion
                        </Text>
                    </div>
                }
                position='top'
            />
            <Popover
                trigger={<Button variant='secondary'>Smooth Right</Button>}
                content={
                    <div>
                        <Text variant='body-medium'>
                            Smooth animation from right!
                        </Text>
                        <Text
                            variant='body-small'
                            style={{
                                marginTop: '8px',
                                color: 'var(--grey-600)',
                            }}
                        >
                            No more abrupt jumps
                        </Text>
                    </div>
                }
                position='right'
            />
            <Popover
                trigger={<Button variant='alternate'>Smooth Left</Button>}
                content={
                    <div>
                        <Text variant='body-medium'>
                            Smooth animation from left!
                        </Text>
                        <Text
                            variant='body-small'
                            style={{
                                marginTop: '8px',
                                color: 'var(--grey-600)',
                            }}
                        >
                            Fluid transitions
                        </Text>
                    </div>
                }
                position='left'
            />
        </div>
    ),
    parameters: {
        layout: 'padded',
    },
};

export const CenteredPositioning: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '40px',
                padding: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                backgroundColor: '#f0f0f0',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Popover
                    trigger={<Button variant='primary'>Top Center</Button>}
                    content={
                        <div style={{ textAlign: 'center', minWidth: '150px' }}>
                            <Text variant='body-medium'>Top Center Test</Text>
                            <Text
                                variant='body-small'
                                style={{ marginTop: '4px' }}
                            >
                                Should be centered above
                            </Text>
                        </div>
                    }
                    position='top'
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <Popover
                    trigger={<Button variant='secondary'>Right Center</Button>}
                    content={
                        <div style={{ textAlign: 'center', minWidth: '150px' }}>
                            <Text variant='body-medium'>Right Center Test</Text>
                            <Text
                                variant='body-small'
                                style={{ marginTop: '4px' }}
                            >
                                Should be centered to the right
                            </Text>
                        </div>
                    }
                    position='right'
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <Popover
                    trigger={<Button variant='alternate'>Left Center</Button>}
                    content={
                        <div style={{ textAlign: 'center', minWidth: '150px' }}>
                            <Text variant='body-medium'>Left Center Test</Text>
                            <Text
                                variant='body-small'
                                style={{ marginTop: '4px' }}
                            >
                                Should be centered to the left
                            </Text>
                        </div>
                    }
                    position='left'
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <Popover
                    trigger={<Button variant='danger'>Bottom Center</Button>}
                    content={
                        <div style={{ textAlign: 'center', minWidth: '150px' }}>
                            <Text variant='body-medium'>
                                Bottom Center Test
                            </Text>
                            <Text
                                variant='body-small'
                                style={{ marginTop: '4px' }}
                            >
                                Should be centered below
                            </Text>
                        </div>
                    }
                    position='bottom'
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
    },
};
