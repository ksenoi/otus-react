import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomeScreen}  from '../screens/Home/Home'
import AuthScreen from '../screens/AuthScreen'
import NotFoundScreen from '../screens/NotFound'
import { ProtectedRoute } from './ProtectedRoute';
import ProfileScreen from 'src/screens/ProfileScreen/ProfileScreen';
import AdminScreen from 'src/screens/AdminScreen';

const Main: FC = () => (
  <Routes>
    <Route index element={<HomeScreen />} />
    <Route path="profile" element={<ProfileScreen />} />
    <Route path="admin" element={<AdminScreen />} />
    <Route path="*" element={<NotFoundScreen />} />
  </Routes>
);

export const Navigation: FC = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthScreen />}>
        <Route path=":mode" element={<AuthScreen />} />
      </Route>
      <Route path="*" element={<Main />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
