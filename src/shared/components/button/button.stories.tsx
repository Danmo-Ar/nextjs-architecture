// Importing necessary modules and components for the story
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

// Setting up the default export for the Button component story
const meta = {
    title: 'Components/Button',
    component: Button
} satisfies Meta<typeof Button>;

export default meta;

// Exporting the default export for StoruObj
type Story = StoryObj<typeof Button>;

// Creating a template for the Button component story
export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Button'
    }
};
