import { ChangeEvent, FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../stores/root.store';
import Input from '../../ui/input/Input';
import { FaTimes } from 'react-icons/fa';
import Button from '../../ui/button/Button';
import css from './ProfileInfo.module.css';

const ProfileInfo: FC = () => {
  const userId: string | null = localStorage.getItem('currentUserId');
  const { usersStore } = useContext(StoreContext);

  useEffect(() => {
    if (userId) {
      usersStore.getUser(userId);
    }
  }, [usersStore, userId]);

  const { login, fullName: localFullName, password: localPassword } = usersStore.userDetail;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => usersStore.changeUserDetailsValue(e);

  const changeFullName = async () => {
    if (userId) await usersStore.updateUserFullName(userId, localFullName);
  };

  const changePassword = async () => {
    if (userId) await usersStore.updatePassword(userId, localPassword);
  };

  const handleDelete = async () => {
    await usersStore.deleteUser(userId);
  };

  return (
    <div className={css.wrapper}>
      <span className={css.login}>
        Логин: <span>{login}</span>
      </span>
      <Input
        type="text"
        value={localFullName}
        label="Изменить полное имя"
        name="fullName"
        onChange={handleChange}
        onBlur={changeFullName}
      />
      <Input
        type="password"
        value={localPassword}
        label="Изменить пароль"
        name="password"
        onChange={handleChange}
        onBlur={changePassword}
      />
      <Button type="button" onClick={handleDelete} className={css.deletebutton}>
        <span>Удалить аккаунт</span>
        <FaTimes />
      </Button>
    </div>
  );
};

export default observer(ProfileInfo);
