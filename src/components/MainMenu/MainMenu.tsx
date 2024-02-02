import { Menu, MenuProps } from 'antd';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { tokenSelectors } from 'src/store/token';


export const MainMenu: FC = () => {
  //const token = storage.get(TOKEN_KEY);


  const token = useSelector(tokenSelectors.get);
  const location = useLocation();


  
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
      label: <Link to="/categories">Категории</Link>,
      key: 'categories',
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
