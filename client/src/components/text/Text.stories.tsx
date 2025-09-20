import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'caption',
                'body-small',
                'body',
                'heading-small',
                'heading',
                'heading-large',
            ],
        },
        color: {
            control: 'select',
            options: [
                'primary',
                'secondary',
                'danger',
                'grey-100',
                'grey-200',
                'grey-300',
                'grey-600',
                'grey-800',
                'inherit',
            ],
        },
        weight: {
            control: 'select',
            options: ['light', 'normal', 'medium', 'bold'],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
        as: {
            control: 'select',
            options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
        },
        truncate: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Variant examples
export const Caption: Story = {
    args: {
        children:
            'This is caption text - small and subtle for labels and metadata',
        variant: 'caption',
    },
};

export const BodySmall: Story = {
    args: {
        children:
            'This is small body text for secondary information and descriptions',
        variant: 'body-small',
    },
};

export const Body: Story = {
    args: {
        children:
            'This is body text for main content and paragraphs. It has good readability and is the most common text variant.',
        variant: 'body',
    },
};

export const HeadingSmall: Story = {
    args: {
        children: 'Small Heading',
        variant: 'heading-small',
    },
};

export const Heading: Story = {
    args: {
        children: 'Main Heading',
        variant: 'heading',
    },
};

export const HeadingLarge: Story = {
    args: {
        children: 'Large Heading',
        variant: 'heading-large',
    },
};

// Color examples
export const PrimaryColor: Story = {
    args: {
        children: 'Primary colored text',
        variant: 'body',
        color: 'primary',
    },
};

export const SecondaryColor: Story = {
    args: {
        children: 'Secondary colored text',
        variant: 'body',
        color: 'secondary',
    },
};

export const DangerColor: Story = {
    args: {
        children: 'Danger colored text',
        variant: 'body',
        color: 'danger',
    },
};

export const GreyColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant='body' color='grey-800'>
                Grey 800 - Darkest grey text
            </Text>
            <Text variant='body' color='grey-600'>
                Grey 600 - Medium grey text
            </Text>
            <Text variant='body' color='grey-300'>
                Grey 300 - Light grey text
            </Text>
            <Text variant='body' color='grey-200'>
                Grey 200 - Lighter grey text
            </Text>
            <div style={{ backgroundColor: '#000', padding: '8px' }}>
                <Text variant='body' color='grey-100'>
                    Grey 100 - Lightest grey text (on dark background)
                </Text>
            </div>
        </div>
    ),
};

// Weight examples
export const FontWeights: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant='body' weight='light'>
                Light weight text
            </Text>
            <Text variant='body' weight='normal'>
                Normal weight text
            </Text>
            <Text variant='body' weight='medium'>
                Medium weight text
            </Text>
            <Text variant='body' weight='bold'>
                Bold weight text
            </Text>
        </div>
    ),
};

// Alignment examples
export const TextAlignment: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '300px',
            }}
        >
            <Text variant='body' align='left'>
                Left aligned text
            </Text>
            <Text variant='body' align='center'>
                Center aligned text
            </Text>
            <Text variant='body' align='right'>
                Right aligned text
            </Text>
        </div>
    ),
};

// Truncation example
export const TruncatedText: Story = {
    render: () => (
        <div style={{ width: '200px' }}>
            <Text variant='body' truncate>
                This is a very long text that will be truncated when it exceeds
                the container width
            </Text>
        </div>
    ),
};

// Custom element examples
export const CustomElements: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant='heading-large' as='h1'>
                H1 Element with large heading style
            </Text>
            <Text variant='heading' as='h2'>
                H2 Element with heading style
            </Text>
            <Text variant='body' as='span'>
                Span element with body style
            </Text>
            <Text variant='caption' as='div'>
                Div element with caption style
            </Text>
        </div>
    ),
};

// Complete showcase
export const VariantShowcase: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text variant='heading-large' color='primary'>
                Typography Showcase
            </Text>
            <Text variant='heading' color='secondary'>
                All Text Variants
            </Text>

            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                <Text variant='heading-small'>Heading Small</Text>
                <Text variant='body'>
                    This is body text that demonstrates the default styling for
                    paragraphs and main content. It has optimal readability and
                    spacing.
                </Text>
                <Text variant='body-small' color='grey-600'>
                    This is small body text, perfect for secondary information,
                    descriptions, and details.
                </Text>
                <Text variant='caption' color='grey-600'>
                    Caption text for labels, metadata, and fine print
                </Text>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <Text variant='body' color='primary'>
                    Primary
                </Text>
                <Text variant='body' color='secondary'>
                    Secondary
                </Text>
                <Text variant='body' color='danger'>
                    Danger
                </Text>
                <Text variant='body' color='grey-600'>
                    Grey
                </Text>
            </div>
        </div>
    ),
};
