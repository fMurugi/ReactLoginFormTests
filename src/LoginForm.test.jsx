import React from 'react';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import LoginForm from './LoginForm';
import { act } from 'react-dom/test-utils';

describe('LoginForm', () => {
  const users = [
    { username: "testuser1", password: "Test1234!" },
    { username: "testuser2", password: "Password123" },
    { username: "testuser3", password: "Abcdefg1$" },
  ];

  const handleSubmit = jest.fn();
  
  beforeEach(() => {
    handleSubmit.mockClear();
  });

  test('renders without errors', () => {
    render(<LoginForm submit={handleSubmit} />);
    expect(screen.getByLabelText('Username *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('displays error message when submitting with invalid input', async () => {
    render(<LoginForm submit={handleSubmit} />);
    const usernameInput = screen.getByLabelText('Username *');
    const passwordInput = screen.getByLabelText('Password *');
    const submitButton = screen.getByRole('button');
    
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Username is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  test("submits form with valid input", async () => {
    render(<LoginForm onSubmit={handleSubmit} />);
    const usernameInput = screen.getByLabelText("Username *");
    const passwordInput = screen.getByLabelText("Password *");
    const submitButton = screen.getByRole("button");

    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "Test1234!");
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      username: "testuser",
      password: "Test1234!",
    });
  });

  // test("logs in user with valid credentials", () => {
  //   const submitMock = jest.fn();
  //   const { getByLabelText, getByText } = render(
  //     <LoginForm onSubmit={submitMock} users={users} />
  //   );

  //   const usernameInput = getByLabelText("Username *");
  //   const passwordInput = getByLabelText("Password *");
  //   const submitButton = getByRole("button", { name: /submit/i }, { exact: false });

  //   fireEvent.change(usernameInput, { target: { value: "testuser1" } });
  //   fireEvent.change(passwordInput, { target: { value: "Test1234!" } });
  //   fireEvent.click(submitButton);

  //   expect(submitMock).toHaveBeenCalledTimes(1);
  //   expect(submitMock).toHaveBeenCalledWith({
  //     username: "testuser1",
  //     password: "Test1234!",
  //   });
  // });
});
