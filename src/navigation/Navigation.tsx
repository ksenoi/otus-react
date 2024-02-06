import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomeScreen}  from '../screens/Home/Home'
import AuthScreen from '../screens/AuthScreen'
import NotFoundScreen from '../screens/NotFound'
import { ProtectedRoute } from './ProtectedRoute';
import ProfileScreen from 'src/screens/ProfileScreen/ProfileScreen';
import CategoriesScreen from 'src/screens/CategoriesScreen/CategoriesScreen';
import { ProductsScreen } from 'src/screens/ProductsScreen/ProductsScreen';
import { OrdersScreen } from 'src/screens/OrdersScreen/OrdersScreen';

const Main = () => (
  <Routes>
    <Route index element={<HomeScreen />} />
    <Route path="profile" element={<ProfileScreen />} />
    <Route path="categories" element={<CategoriesScreen/>} />
    <Route path="products" element={<ProductsScreen />} />
    <Route path="orders" element={<OrdersScreen />} />
    <Route path="*" element={<NotFoundScreen />} />
  </Routes>
);

export const Navigation = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthScreen />}>
        <Route path=":mode" element={<AuthScreen />} />
      </Route>
      
      <Route path="*"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
