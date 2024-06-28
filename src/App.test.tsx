import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './components/Login/Login';

describe('Login', () => {
  test('toggles dropdown on click', async () => {
    const { getByAltText, findByText } = render(<Login  />);
    const userAvatar = getByAltText('user avatar');
    if (userAvatar) {
      fireEvent.click(userAvatar);
    }
    const profileButton = await findByText(/Profile/i);
    expect(profileButton).toBeInTheDocument();
  });

  test('performs login action', async () => {
    const onLoginMock = jest.fn();
    const { getByAltText, queryByText } = render(<Login onLogout={onLoginMock}/>);
    const userAvatar = getByAltText('user avatar');
    if (userAvatar) {
      fireEvent.click(userAvatar);
    }
    const loginButton = queryByText(/Log In/i);
    if (loginButton) {
      fireEvent.click(loginButton);
    }
    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalledTimes(1);
    });
  });

  test('performs logout action', async () => {
    const onLogoutMock = jest.fn();
    const { getByAltText, queryByText } = render(<Login  onLogout={onLogoutMock} />);
    const userAvatar = getByAltText('user avatar');
    if (userAvatar) {
      fireEvent.click(userAvatar);
    }
    const logoutButton = queryByText(/Log Out/i);
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }
    await waitFor(() => {
      expect(onLogoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
