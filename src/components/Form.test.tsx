import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import { useDispatch } from 'react-redux';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Form', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    ((useDispatch as unknown) as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('renders input and button', () => {
    render(<Form />);
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add city/i })).toBeInTheDocument();
  });

  it('dispatches addCityWeather with trimmed input and clears input', () => {
    render(<Form />);
    const input = screen.getByPlaceholderText('Enter city name') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /add city/i });

    fireEvent.change(input, { target: { value: '  Kyiv  ' } });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // thunk
    expect(input.value).toBe('');
  });

  it('does not dispatch if input is empty', () => {
    render(<Form />);
    const button = screen.getByRole('button', { name: /add city/i });

    fireEvent.click(button);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
