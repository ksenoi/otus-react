import React from 'react';
import './App.scss';
import { Navigation } from './navigation/Navigation';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { Layout } from './layout/Layout'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Navigation />
        </Layout>        
      </Provider>
    </BrowserRouter>
  );
}

export default App;