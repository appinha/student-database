import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

    expect(container).toHaveTextContent(/Anna(.*)Jane(.*)Joe(.*)Paul/i);
  });

  test('filters data by search input value (case insensitive)', () => {
    const { container } = renderComponent();

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: {value: "Anna"} });

    expect(container).toHaveTextContent(/Anna/i);
    expect(container).not.toHaveTextContent(/Jane/i);
    expect(container).not.toHaveTextContent(/Joe/i);
    expect(container).not.toHaveTextContent(/Paul/i);

    fireEvent.change(textArea, { target: {value: "j"} });

    expect(container).toHaveTextContent(/Jane(.*)Joe(.*)/i);
    expect(container).not.toHaveTextContent(/Anna/i);
    expect(container).not.toHaveTextContent(/Paul/i);
  });

  test('sorts data', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent(/Anna(.*)Jane(.*)Joe(.*)Paul/i);

    const sortButton = screen.getAllByText('▼')[0];
    fireEvent.click(sortButton);

    expect(container).toHaveTextContent(/Paul(.*)Joe(.*)Jane(.*)Anna/i);
    fireEvent.click(sortButton);
  });

  test('filtering and sorting data work together properly', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent(/Anna(.*)Jane(.*)Joe(.*)Paul/i);

    const sortButton = screen.getAllByText('▼')[0];
    fireEvent.click(sortButton);

    expect(container).toHaveTextContent(/Paul(.*)Joe(.*)Jane(.*)Anna/i);

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: {value: "j"} });

    expect(container).toHaveTextContent(/Joe(.*)Jane(.*)/i);
    expect(container).not.toHaveTextContent(/Anna/i);
    expect(container).not.toHaveTextContent(/Paul/i);
  });
});
