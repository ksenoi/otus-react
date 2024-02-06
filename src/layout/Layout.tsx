import React, { ReactNode } from 'react';
import { Layout as AntdLayout } from 'antd';
import MainMenu from '../components/MainMenu/MainMenu';
import './Layout.scss';

type Props = {
  children : ReactNode;
}

export const Layout  = ({ children } : Props) => (
  <AntdLayout className='layout'>
    <AntdLayout.Header>
      <MainMenu/>
    </AntdLayout.Header>
    <AntdLayout.Content  className='content'>
      {children}
    </AntdLayout.Content>
  </AntdLayout>
);
