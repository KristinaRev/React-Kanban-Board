import { FC, ReactNode, JSX } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import styles from './Portal.module.css';

export const root = document.getElementById('modals');

export interface IPortalProps {
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}

export const Portal: FC<IPortalProps> = ({ className, children, element: Element = 'div' }) => {
  return root
    ? ReactDOM.createPortal(
        <Element className={cn(styles.Portal, className)}>{children}</Element>,
        root
      )
    : null;
};
