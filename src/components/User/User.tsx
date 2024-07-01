import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import css from './User.module.css';

interface UserProps {
  id: string;
  fullName: string;
  dateRegister: string;
  login: string;
}

const User: FC<UserProps> = (props) => {
  const { fullName, dateRegister, id, login } = props;

  return (
    <div className={css.container}>
      <div className={css.info}>
        <span className={css.name}>{fullName}</span>
        <span className={css.login}>{login}</span>
        <span className={css.date}>{dateRegister}</span>
      </div>
      <Link to={`/users/${id}`} className={css.userDetailsButton}>
        User Page
      </Link>
    </div>
  );
};

export default observer(User);
