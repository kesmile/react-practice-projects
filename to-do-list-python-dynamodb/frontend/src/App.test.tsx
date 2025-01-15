import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';
import axios from 'axios';

vi.mock('axios');

describe('App', () => {
  it('renders todo list', () => {
    render(<App />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('fetches and displays tasks', async () => {
    const tasks = [
      { taskId: '1', title: 'Task 1', completed: false },
      { taskId: '2', title: 'Task 2', completed: true },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: tasks });

    render(<App />);

    const allTabPanel = await screen.findByRole('tabpanel', { name: 'All' });

    expect(await within(allTabPanel).findByText('Task 1')).toBeVisible();
    expect(await within(allTabPanel).findByText('Task 2')).toBeVisible();
  });
});