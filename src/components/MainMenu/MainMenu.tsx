import { Menu, MenuProps } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tokenSelectors } from 'src/store/token';

export const MainMenu: FC = () => {
  const token = useSelector(tokenSelectors.get);

  const profileLink = {
    label: <Link to="/profile">Профиль</Link>,
    key: 'profile',
  };
  const authLink = {
    label: <Link to="/auth">Вход</Link>,
    key: 'auth',
  };

  const items: MenuProps['items'] = [
    {
      label: <Link to="/">Домой</Link>,
      key: 'home',
    },
    {
      label: <Link to="/category">Категории</Link>,
      key: 'category',
    },
    {
      label: <Link to="/admin">Админ</Link>,
      key: 'admin',
    },
    token ? profileLink : authLink,
  ];

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} style={{ flex: 1, minWidth: 0 }} />
  );
};

export default MainMenu;
