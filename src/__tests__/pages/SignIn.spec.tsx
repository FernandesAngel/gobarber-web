import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
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

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-Mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPuh).toHaveBeenCalledWith('/dashboard');
    });
  });
});
