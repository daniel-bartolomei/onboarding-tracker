import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./OnboardingTracker", () => () => {
  return <div>OnboardingTracker</div>;
});

test('renders learn react link', () => {
  render(<App />);
  
  expect(screen.getByText(/OnboardingTracker/i)).toBeInTheDocument();
});
