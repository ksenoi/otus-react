import React, { FC, ReactNode } from 'react';
import { Layout as AntdLayout } from 'antd';
import MainMenu from '../components/MainMenu/MainMenu';

type Props = {
  children : ReactNode;
}

export const Layout  = ({ children } : Props) => (
  <AntdLayout>
    <AntdLayout.Header>
      <MainMenu/>
    </AntdLayout.Header>
    {children}
  </AntdLayout>
);
