import { fireEvent, render, screen } from './test-utils';
import App from '../src/App';
import React from 'react';
import { vi } from 'vitest'

describe('App', () => {
  const initState = [
    {
      name: 'Demo',
      check: false
    }
  ]

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Check Render app', () => {
    const { getByText } = render(<App />);
    expect( getByText('Todo list') ).toBeTruthy();
  });

  it('Test init state from the localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify(initState));

    const { getAllByRole } = render(<App />);
    const list = getAllByRole('listitem');
    const itemNames = list.map(item => item.textContent);
    expect(list.length).toBe(1);
    expect(itemNames).toContain('Demo');
  });

  it('Test Add one item', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify([]));

    const { getByRole, getByText, getAllByRole } = render(<App />);
    const input = getByRole('textbox');
    const addButton = getByText('Add');
    fireEvent.change(input, {
      target: { value: 'new value' }
    });
    fireEvent.click(addButton);

    const list = getAllByRole('listitem');
    const itemNames = list.map(item => item.textContent);
    expect(list.length).toBe(1);
    expect(itemNames).toContain('new value');
  });

});