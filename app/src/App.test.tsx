import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const renderComponent = () => render(<App />)

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent(/Student Database/i);
    expect(container).toHaveTextContent(
      /First Name(.*)Last Name(.*)Phone(.*)e-mail(.*)Primary Group(.*)Hours Studied/i
    );
    expect(container).toHaveTextContent(
      /Joe(.*)Smith Jr(.*)781-633-2222(.*)something@somewhere.com(.*)Important People(.*)1000/i
    );
  });

  test('initially renders sorted alphabetically by first Name', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent(/Anna(.*)Joe/i);
  })
});
