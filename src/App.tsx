import React from 'react';

import './App.scss';
import { Navigation } from './navigation/Navigation';
import { Layout, Menu, MenuProps } from 'antd'

import { BrowserRouter, Link } from 'react-router-dom';
import MainMenu from './components/MainMenu/MainMenu';
import { Provider } from 'react-redux';
import { store } from './store';



const { Header, Content, Footer } = Layout;



function App() {
  return (

    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Header><MainMenu /></Header>
          <Content><Navigation /> </Content>
          <Footer>footer</Footer>
        </Layout>
      </Provider>
    </BrowserRouter>



  );
}

export default App;
