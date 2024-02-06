import React, { FC, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { SignInForm } from 'src/components/Forms/SignInForm/SignInForm';
import { SignUpForm } from 'src/components/Forms/SignUpForm/SignUpForm';


export enum AuthMode {
  signIn = 'signin',
  signUp = 'signup',
}

export type Params = { mode: AuthMode; token?: string };

export const AuthScreen: FC = () => {
  const location = useLocation();
  const path = useMemo(() => location.pathname.split('/').slice(0, -1).join('/'), [location.pathname]);
  const linkStyle= { display: "inline", margin: "10px"};
  const bStyle = { display: "flex", margin: "10px", alignItems: "left", justifyContent: "center" };

  const signinElement = (
    <>
      <div style={bStyle}>
        <div style = {linkStyle} >Войти</div>
        <Link style = {linkStyle} to={`${path}/${AuthMode.signUp}`}>Зарегистрироваться</Link>
      </div>
      <SignInForm />
    </>
  );

  const signupElement = (
    <>
        <div style={bStyle}>
          <div style = {linkStyle} >Зарегистрироваться</div>
          <Link  style = {linkStyle} to={`${path}/${AuthMode.signIn}`}>Войти</Link>
         </div>
        <SignUpForm />
    </>
  );

  return (
    <div>
      <Routes>
        <Route index element={<Navigate to={AuthMode.signIn} state={location.state} replace />} />
        <Route path={AuthMode.signIn} element={signinElement} />
        <Route path={AuthMode.signUp} element={signupElement} />
      </Routes>

    </div>
  );
};

export default AuthScreen;
