import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WorkflowCanvas from '../WorkflowCanvas';

describe('WorkflowCanvas', () => {
  test('clicking add button on the search result adds a workflow block to the canvas', () => {
    render(<WorkflowCanvas />);

    // Grab the search box
    const input = screen.getByPlaceholderText('Add new node...');
    expect(input.value).toBe('');

    // Add search query to show search results with buttons
    fireEvent.change(input, { target: { value: 'a' } });
    expect(input.value).toBe('a');

    // Check the button to be tested is rendered
    const addNodeBtn = screen.getByTestId('add-node-btn-1');
    expect(addNodeBtn).toBeInTheDocument();

    // Click the button to be tested
    fireEvent.click(addNodeBtn);

    // Check the node to be added is present on the canavs
    const nodeTitle = screen.getByTestId('added-node-title-1');
    expect(nodeTitle).toBeInTheDocument();
    expect(nodeTitle).toHaveTextContent('Data Generator');
  });
});
