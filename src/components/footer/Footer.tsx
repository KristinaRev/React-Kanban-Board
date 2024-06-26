import { FC, memo } from 'react';
import { observer } from 'mobx-react-lite';
import './Footer.scss';

interface FooterProps {
  backlogCount: number;
  doneCount: number;
  inProgressCount: number;
  readyCount: number;
}

const Footer: FC<FooterProps> = ({ backlogCount, doneCount, inProgressCount, readyCount }) => {
  return (
    <footer className="footer">
      <div className="counts">
        <p className="count">backlog: {backlogCount}</p>
        <p className="count">done: {doneCount}</p>
        <p className="count">inProgress: {inProgressCount}</p>
        <p className="count">ready: {readyCount}</p>
      </div>
      <div className="copy">
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
