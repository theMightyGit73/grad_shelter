// src/pages/Residents.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Residents from './Residents';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
// You likely need to import screen, getByText etc. from @testing-library/react
// and 'expect' from the environment, but since Vitest globals are now working,
// we rely on the implicit globals.


// Helper function to wrap component in the router context for testing
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// NOTE: The custom textMatchFunction is not needed with the data-testid approach.
// We keep it for reference but it is unused.
const textMatchFunction = (content, element) => {
    const hasText = (node) => node.textContent === content;
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      (child) => !hasText(child)
    );
    return nodeHasText && childrenDontHaveText;
};

describe('Residents Page', () => {
  it('should display residents and stats after successful API fetch', async () => {
    // 1. Arrange: Render the Residents component within the router
    renderWithRouter(<Residents />);

    // 2. Assert: Wait for the component to finish its API call and render the data
    
    // Check for resident cards (use findByText as they are async)
    expect(await screen.findByText('Test David')).toBeInTheDocument();
    expect(await screen.findByText('Test Sean')).toBeInTheDocument();
    
    // 3. FIX: Use getByTestId on the parent elements and toHaveTextContent 
    // This is robust against the <strong> tag separating the text and number.
    
    // Total Residents: 2
    // Assumes data-testid="total-residents-stat" is on the parent div
    expect(screen.getByTestId('total-residents-stat')).toHaveTextContent(/Total Residents:.*2/i);
    
    // Available: 1
    // Assumes data-testid="available-stat" is on the parent div
    expect(screen.getByTestId('available-stat')).toHaveTextContent(/Available:.*1/i);
    
    // Graduated: 1
    // Assumes data-testid="graduated-stat" is on the parent div
    expect(screen.getByTestId('graduated-stat')).toHaveTextContent(/Graduated:.*1/i);
  });

  it('should display the empty state message on a failed API fetch', async () => {
    // 1. Arrange: Override the mock to return a 500 error for this specific test
    server.use(
      http.get('http://localhost:8080/api/residents', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    // Render the component
    renderWithRouter(<Residents />);

    // 2. Assert: Wait for the empty state message to appear
    await waitFor(() => {
        expect(screen.getByText(/No residents yet! Intake your first graduate/i)).toBeInTheDocument();
    });
    
    // Ensure none of the mock resident names are present
    expect(screen.queryByText('Test David')).not.toBeInTheDocument();
  });
});