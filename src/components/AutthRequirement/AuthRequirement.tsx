import { FC } from 'react';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import css from './AuthRequirement.module.css';

const AuthRequirement: FC = () => {
  return (
    <div className={css.wrapper}>
      <Link to={ROUTES.REGISTRATION} className={css.link}>
        Зарегистрируйтесь
      </Link>
      <span> или </span>
      <Link to={ROUTES.AUTHORIZATION} className={css.link}>
        войдите в аккаунт
      </Link>
    </div>
  );
};

export default AuthRequirement;
