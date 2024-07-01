import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import css from './UserMainPanel.module.css';
import { StoreContext } from '../../stores/root.store';
import { Link } from 'react-router-dom';

const UserMainPanel: FC = () => {
  const userId: string | null = localStorage.getItem('currentUserId');
  const { usersStore } = useContext(StoreContext);

  useEffect(() => {
    if (userId) {
      usersStore.getUser(userId);
    }
  }, [usersStore, userId]);

  const { userDetail } = usersStore;
  const rights = userDetail ? userDetail.rights : null;

  return (
    <div className={css.wrapper}>
      {rights === 'admin' && (
        <Link to={'/admin'} className={css.button}>
          На страницу пользователей
        </Link>
      )}
    </div>
  );
};

//todo заполнить страницу

export default observer(UserMainPanel);
