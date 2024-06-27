import { useContext, ChangeEvent, FC } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/input/Input';
import { StoreContext } from '../../stores/root.store';
import Button from '../../ui/button/Button';
import { WithClassName } from 'interfaces';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import css from './UserLogin.module.css';

const UserLogin: FC<WithClassName & { onLogin: () => void }> = ({ className, onLogin }) => {
  const { usersStore } = useContext(StoreContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => usersStore.changeLoginFormValue(e);

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { login, password } = usersStore.userLoginForm;
    const loggedIn = await usersStore.loginUser(login, password);
    if (loggedIn) {
      onLogin();
    } else {
      console.log('Неправильный логин или пароль');
    }
  };

  return (
    <div className={`${css.Login} ${className}`}>
      <form onSubmit={formSubmit} className={css.form}>
        <Input
          id="userLogin"
          name="login"
          type="text"
          placeholder="Введите логин"
          onChange={handleChange}
          value={usersStore.userLoginForm.login}
          label="Логин"
        />
        <Input
          id="userPassword"
          name="password"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          value={usersStore.userLoginForm.password}
          label="Пароль"
        />
        <Button type="submit">Войти</Button>
      </form>
      <Link to={ROUTES.REGISTRATION} className={css.link}>
        Зарегистрироваться
      </Link>
    </div>
  );
};

export default observer(UserLogin);
