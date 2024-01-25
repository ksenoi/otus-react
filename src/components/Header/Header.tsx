import { Logo } from '../../components/Logo/Logo';
import './Header.css'
import cn from 'clsx';
import s from './Header.scss';
import React, { memo } from 'react';

export type HeaderProps = {
  className?: string;
};

export const Header = memo<HeaderProps>(({ className }) => {
  return (
    <header className={cn(s.root, className)}>
    <div>
      <Logo className={s.logo}/>
    </div>
    </header>
  )
});

