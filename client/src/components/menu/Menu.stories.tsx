import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MdMoreVert, MdPerson, MdSettings, MdLogout, MdEdit, MdDelete, MdShare, MdDownload, MdKeyboardArrowDown } from 'react-icons/md';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import Button from '../button/Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'],
    },
    offset: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    closeOnItemClick: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary" rightIcon={<MdMoreVert size={16} />}>Actions</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />} onClick={() => console.log('Edit clicked')}>
          Edit
        </MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />} onClick={() => console.log('Share clicked')}>
          Share
        </MenuItem>
        <MenuItem leftIcon={<MdDownload size={16} />} onClick={() => console.log('Download clicked')}>
          Download
        </MenuItem>
        <MenuDivider />
        <MenuItem 
          leftIcon={<MdDelete size={16} />} 
          destructive 
          onClick={() => console.log('Delete clicked')}
        >
          Delete
        </MenuItem>
      </>
    ),
  },
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button variant="primary" rightIcon={<MdKeyboardArrowDown size={16} />}>Options</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdPerson size={16} />} onClick={() => console.log('Profile clicked')}>
          Profile
        </MenuItem>
        <MenuItem leftIcon={<MdSettings size={16} />} disabled onClick={() => console.log('Settings clicked')}>
          Settings (Disabled)
        </MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdLogout size={16} />} onClick={() => console.log('Logout clicked')}>
          Logout
        </MenuItem>
      </>
    ),
  },
};

export const IconTrigger: Story = {
  args: {
    trigger: (
      <Button variant="secondary-subtle" size="small">
        <MdMoreVert size={20} />
      </Button>
    ),
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />}>Edit</MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>Share</MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>Delete</MenuItem>
      </>
    ),
  },
};

export const WithRightIcons: Story = {
  args: {
    trigger: <Button variant="secondary">Menu with shortcuts</Button>,
    children: (
      <>
        <MenuItem 
          leftIcon={<MdEdit size={16} />} 
          rightIcon={<span style={{ fontSize: '12px', color: 'var(--grey-600)' }}>⌘E</span>}
        >
          Edit
        </MenuItem>
        <MenuItem 
          leftIcon={<MdShare size={16} />} 
          rightIcon={<span style={{ fontSize: '12px', color: 'var(--grey-600)' }}>⌘S</span>}
        >
          Share
        </MenuItem>
        <MenuItem 
          leftIcon={<MdDownload size={16} />} 
          rightIcon={<span style={{ fontSize: '12px', color: 'var(--grey-600)' }}>⌘D</span>}
        >
          Download
        </MenuItem>
        <MenuDivider />
        <MenuItem 
          leftIcon={<MdDelete size={16} />} 
          rightIcon={<span style={{ fontSize: '12px', color: 'var(--grey-600)' }}>⌫</span>}
          destructive
        >
          Delete
        </MenuItem>
      </>
    ),
  },
};

export const TopPlacement: Story = {
  args: {
    placement: 'top-start',
    trigger: <Button variant="primary">Menu Above</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdPerson size={16} />}>Profile</MenuItem>
        <MenuItem leftIcon={<MdSettings size={16} />}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdLogout size={16} />}>Logout</MenuItem>
      </>
    ),
  },
};

export const RightPlacement: Story = {
  args: {
    placement: 'right',
    trigger: <Button variant="secondary">Menu Right →</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />}>Edit Item</MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>Share Item</MenuItem>
        <MenuItem leftIcon={<MdDownload size={16} />}>Download Item</MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>Delete Item</MenuItem>
      </>
    ),
  },
};

export const LeftPlacement: Story = {
  args: {
    placement: 'left',
    trigger: <Button variant="secondary">← Menu Left</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />}>Edit Item</MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>Share Item</MenuItem>
        <MenuItem leftIcon={<MdDownload size={16} />}>Download Item</MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>Delete Item</MenuItem>
      </>
    ),
  },
};

export const DisabledMenu: Story = {
  args: {
    disabled: true,
    trigger: <Button variant="secondary" disabled>Disabled Menu</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />}>Edit</MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>Share</MenuItem>
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>Delete</MenuItem>
      </>
    ),
  },
};

export const LongMenuItems: Story = {
  args: {
    trigger: <Button variant="primary">Long Items</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdPerson size={16} />}>
          View User Profile and Personal Information
        </MenuItem>
        <MenuItem leftIcon={<MdSettings size={16} />}>
          Account Settings and Preferences Configuration
        </MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>
          Share this item with other users and collaborators
        </MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>
          Permanently delete this item from your account
        </MenuItem>
      </>
    ),
  },
};

export const NoCloseOnClick: Story = {
  args: {
    closeOnItemClick: false,
    trigger: <Button variant="secondary">Persistent Menu</Button>,
    children: (
      <>
        <MenuItem leftIcon={<MdEdit size={16} />}>Edit (menu stays open)</MenuItem>
        <MenuItem leftIcon={<MdShare size={16} />}>Share (menu stays open)</MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdDelete size={16} />} destructive>Delete (menu stays open)</MenuItem>
      </>
    ),
  },
};

// Complex example with nested structure
export const ComplexMenu: Story = {
  args: {
    trigger: (
      <div style={{ 
        padding: '12px 16px', 
        border: '1px solid var(--grey-300)', 
        borderRadius: 'var(--border-radius-standard)', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <MdPerson size={20} />
        <span>John Doe</span>
        <MdKeyboardArrowDown size={16} />
      </div>
    ),
    children: (
      <>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--grey-200)', marginBottom: '4px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>John Doe</div>
          <div style={{ fontSize: '12px', color: 'var(--grey-600)' }}>john.doe@example.com</div>
        </div>
        <MenuItem leftIcon={<MdPerson size={16} />}>
          View Profile
        </MenuItem>
        <MenuItem leftIcon={<MdSettings size={16} />}>
          Account Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdShare size={16} />}>
          Invite Friends
        </MenuItem>
        <MenuItem leftIcon={<MdDownload size={16} />}>
          Download Data
        </MenuItem>
        <MenuDivider />
        <MenuItem leftIcon={<MdLogout size={16} />} destructive>
          Sign Out
        </MenuItem>
      </>
    ),
  },
};
