import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible modal component with backdrop blur, keyboard navigation, and multiple size options.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in the modal header',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Controls the modal width and max-width',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Controls whether the close button is shown in the header',
    },
    children: {
      control: false,
      description: 'Modal content',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when modal is closed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component to handle modal state
const ModalWrapper = ({ children, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>
        This is the default modal content. You can put any React components
        here.
      </p>
      <p>
        Click the close button, press Escape, or click outside to close the
        modal.
      </p>
    </ModalWrapper>
  ),
  args: {
    title: 'Default Modal',
    size: 'medium',
    showCloseButton: true,
  },
};

export const Small: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>This is a small modal, perfect for confirmations or simple forms.</p>
      <div style={{ marginTop: '20px' }}>
        <Button variant='primary' style={{ marginRight: '10px' }}>
          Confirm
        </Button>
        <Button variant='secondary'>Cancel</Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Small Modal',
    size: 'small',
    showCloseButton: true,
  },
};

export const Medium: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>
        This is a medium-sized modal, good for most use cases including forms
        and detailed content.
      </p>
      <div style={{ margin: '20px 0' }}>
        <h3>Example Form</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type='text'
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type='email'
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant='primary'>Save</Button>
        <Button variant='secondary'>Cancel</Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Medium Modal',
    size: 'medium',
    showCloseButton: true,
  },
};

export const Large: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>
        This is a large modal, suitable for complex forms, detailed content, or
        data tables.
      </p>
      <div style={{ margin: '20px 0' }}>
        <h3>Large Content Example</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <div style={{ margin: '20px 0' }}>
          <h4>Table Example</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px' }}>John Doe</td>
                <td style={{ padding: '8px' }}>Developer</td>
                <td style={{ padding: '8px' }}>Active</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Jane Smith</td>
                <td style={{ padding: '8px' }}>Designer</td>
                <td style={{ padding: '8px' }}>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Large Modal',
    size: 'large',
    showCloseButton: true,
  },
};

export const NoTitle: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <h2 style={{ marginTop: 0 }}>Custom Header</h2>
      <p>
        This modal has no title prop, so you can create your own custom header
        within the content.
      </p>
      <p>The close button is still available in the top-right corner.</p>
    </ModalWrapper>
  ),
  args: {
    size: 'medium',
    showCloseButton: true,
  },
};

export const NoCloseButton: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>
        This modal has no close button. Users can still close it by clicking
        outside or pressing Escape.
      </p>
      <div style={{ marginTop: '20px' }}>
        <Button variant='primary'>Done</Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'No Close Button',
    size: 'medium',
    showCloseButton: false,
  },
};

export const MinimalModal: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>This is a minimal modal with no title and no close button.</p>
      <p>
        Perfect when you want complete control over the modal header and
        actions.
      </p>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant='primary'>Got it!</Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'small',
    showCloseButton: false,
  },
};

export const LongContent: Story = {
  render: args => (
    <ModalWrapper {...args}>
      <p>
        This modal demonstrates scrollable content when the content exceeds the
        modal height.
      </p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>
          Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      ))}
      <div style={{ marginTop: '20px' }}>
        <Button variant='primary'>Close</Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Scrollable Content',
    size: 'medium',
    showCloseButton: true,
  },
};

// For testing the actual open state in Storybook
export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    title: 'Always Open Modal',
    size: 'medium',
    showCloseButton: true,
    onClose: () => console.log('Modal close triggered'),
    children: (
      <div>
        <p>This modal is always open for testing purposes.</p>
        <p>
          In Storybook, you can interact with it to test the close
          functionality.
        </p>
        <div style={{ marginTop: '20px' }}>
          <Button variant='primary' style={{ marginRight: '10px' }}>
            Primary Action
          </Button>
          <Button variant='secondary'>Secondary Action</Button>
        </div>
      </div>
    ),
  },
};
