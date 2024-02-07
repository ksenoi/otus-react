import { Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderSelectors } from 'src/store/order';
import { tokenSelectors } from 'src/store/token';

export const MainMenu = () => {

  const {token} = useSelector(tokenSelectors.get);
  const order = useSelector(orderSelectors.get);
    
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
      label: <Link to="/">Главная</Link>,
      key: 'home',
    },
    {
      label: <Link to="/categories">Категории</Link>,
      key: 'categories',
    },
    {
      label: <Link to="/products">Товары</Link>,
      key: 'products',
    },
    {
      label: <Link to="/orders">Заказы {order.products.length>0?'('+order.products.length+')':''} </Link>,
      key: 'orders',
    },
    token ? profileLink : authLink,
  ];

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} style={{ flex: 1, minWidth: 0 }} />
  );
};

export default MainMenu;
