import { FC, memo } from 'react';
import { observer } from 'mobx-react-lite';
import css from './Footer.module.css';

interface FooterProps {
  backlogCount: number;
  doneCount: number;
  inProgressCount: number;
  readyCount: number;
}

const Footer: FC<FooterProps> = ({ backlogCount, doneCount, inProgressCount, readyCount }) => {
  return (
    <footer className={css.footer}>
      <div className={css.counts}>
        <p className={css.count}>backlog: {backlogCount}</p>
        <p className={css.count}>done: {doneCount}</p>
        <p className={css.count}>inProgress: {inProgressCount}</p>
        <p className={css.count}>ready: {readyCount}</p>
      </div>
      <div className={css.copy}>
        Created by{' '}
        <a href="https://github.com/KristinaRev" target="_blank" rel="noreferrer">
          Kris Kipper
        </a>
        , 2023
      </div>
    </footer>
  );
};

export default memo(observer(Footer));
