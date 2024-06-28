import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/Login/Login';
import { RootStore, StoreContext } from '../stores/root.store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNode } from 'react';

describe('Login', () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
  });

  const renderWithContext = (component: ReactNode) => {
    return render(
      <StoreContext.Provider value={rootStore}>
        <Router>{component}</Router>
      </StoreContext.Provider>
    );
  };

  test('toggles dropdown on click', async () => {
    const { getByAltText, findByText } = renderWithContext(<Login />);
    const userAvatar = getByAltText('user avatar');
    if (userAvatar) {
      fireEvent.click(userAvatar);
    }
    const profileButton = await findByText(/Profile/i);
    expect(profileButton).toBeInTheDocument();
  });

  test('performs login action', async () => {
    const { getByAltText, queryByText } = renderWithContext(<Login />);
    const userAvatar = getByAltText('user avatar');
    if (userAvatar) {
      fireEvent.click(userAvatar);
    }
    const loginButton = queryByText(/Log In/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('performs logout action', async () => {
    rootStore.usersStore.login = true;
    const onLogoutMock = jest.fn();
    const { getByAltText, queryByText } = renderWithContext(<Login onLogout={onLogoutMock} />);
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
