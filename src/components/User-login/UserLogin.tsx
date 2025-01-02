import { ChangeEvent, FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/input/Input';
import { StoreContext } from '../../stores/root.store';
import { WithClassName } from 'interfaces';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import css from './UserLogin.module.css';
import { Form } from '../Form/Form';

const UserLogin: FC<WithClassName & { onLogin: () => void }> = ({ className, onLogin }) => {
  const { usersStore } = useContext(StoreContext);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => usersStore.changeLoginFormValue(e);

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { login, password } = usersStore.userLoginForm;
    const loggedIn = usersStore.loginUser(login, password);

    if (loggedIn) {
      onLogin();
      setError(null);
    } else {
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <div className={`${css.Login} ${className}`}>
      <Form submitText={'Войти'} onSubmit={formSubmit} error={error}>
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
      </Form>
      <Link to={ROUTES.REGISTRATION} className={css.link}>
        Зарегистрироваться
      </Link>
    </div>
  );
};

export default observer(UserLogin);
