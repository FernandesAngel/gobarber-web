import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPuh = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPuh,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });
    fireEvent.click(buttonElement);

    expect(mockedHistoryPuh).toHaveBeenCalledWith('/dashboard');
  });
});
