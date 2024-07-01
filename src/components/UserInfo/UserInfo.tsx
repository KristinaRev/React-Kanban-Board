import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../stores/root.store';
import { FaTimes } from 'react-icons/fa';
import Button from '../../ui/button/Button';
import css from './UserInfo.module.css';
import { useParams } from 'react-router-dom';

const UserInfo: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const rights: string | null = localStorage.getItem('currentUserRights');
  const { usersStore } = useContext(StoreContext);

  useEffect(() => {
    if (userId) {
      usersStore.getUser(userId);
    }
  }, [usersStore, userId]);

  const { login, fullName } = usersStore.userDetail;

  const handleDelete = async () => {
    await usersStore.deleteUser(userId);
  };

  return (
    <div className={css.wrapper}>
      <span className={css.login}>
        Логин: <span>{login}</span>
      </span>
      <span className={css.userFullName}>{fullName}</span>

      {rights === 'admin' && (
        <Button type="button" onClick={handleDelete} className={css.deletebutton}>
          <span>Удалить пользователя</span>
          <FaTimes />
        </Button>
      )}
    </div>
  );
};

export default observer(UserInfo);
