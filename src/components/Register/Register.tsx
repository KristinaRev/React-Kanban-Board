import { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import { StoreContext } from '../../stores/root.store';
import { WithClassName } from 'interfaces';
import { ROUTES } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import css from './Register.module.css';

const Register: FC<WithClassName> = () => {
  const { usersStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    usersStore.changeRegFormValue(e);
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { login, password, fullName } = usersStore.userRegForm;
    if (login && password && fullName) {
      await usersStore.addUser(login, password, fullName);
      if (!usersStore.userExistsError) {
        setShowPrompt(false);
        navigate(ROUTES.AUTHORIZATION);
      } else {
        setShowPrompt(true);
      }
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <div className={css.Register}>
      <form onSubmit={formSubmit} className={css.form}>
        <Input
          id="userLogin"
          name="login"
          type="text"
          placeholder="Введите логин"
          onChange={handleChange}
          value={usersStore.userRegForm.login}
          label="Логин"
        />
        <Input
          id="userPassword"
          name="password"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          value={usersStore.userRegForm.password}
          label="Пароль"
        />
        <Input
          id="userFullName"
          name="fullName"
          type="text"
          placeholder="Введите полное имя"
          onChange={handleChange}
          value={usersStore.userRegForm.fullName}
          label="Имя"
        />
        <Button type="submit">Зарегистрироваться</Button>
        {showPrompt &&
          (usersStore.userExistsError ? (
            <span className="errorReg">Пользователь с таким логином уже существует</span>
          ) : (
            <span className="errorReg">Заполните все поля</span>
          ))}
      </form>
      <Link to={ROUTES.AUTHORIZATION} className="link">
        Войти
      </Link>
    </div>
  );
};

export default observer(Register);
