import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// npm install @fortawesome/fontawesome-svg-core
// npm install @fortawesome/free-solid-svg-icons
// npm install @fortawesome/react-fontawesome