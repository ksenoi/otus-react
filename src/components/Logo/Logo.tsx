import React, {memo} from 'react';
import logo from '../../logo.svg';
import s from './Logo.scss';
import cn from 'clsx';
import { Link } from 'react-router-dom';

export type LogoProps = {
  className?: string;
};

export const Logo = memo<LogoProps>(({ className }) => {
  return (
  <Link to="/" className={cn(s.root, className)}>
    <img src={logo} alt="logo" className={s.img} />
  </Link>
  );
});
