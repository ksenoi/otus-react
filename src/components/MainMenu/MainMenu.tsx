import { Menu, MenuProps } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';





export const MainMenu: FC = () => {

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/" >
                    Домой
                </Link>
            ),
            key: 'home',
        },
        {
            label: (
                <Link to="/category" >
                    Категории
                </Link>
            ),
            key: 'category',
        },
        {
            label: (
                <Link to="/profile" >
                    Профиль
                </Link>
            ),
            key: 'profile',
        },
        {
            label: (
                <Link to="/auth" >
                    Вход
                </Link>
            ),
            key: 'auth',
        },

    ]

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
        />
    );
};

export default MainMenu;


