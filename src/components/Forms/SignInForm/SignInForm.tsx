import React, {  useEffect, useState } from 'react';
import { Alert, Form, Input, Space } from 'antd';
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenActions } from 'src/store/token';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { SubmitButton } from "src/components/SubmitButton/SubmitButton";
import { validateMessages, formLayout } from './constants';

import { SignInBody, Token } from 'src/server.types';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { NavigationState } from 'src/navigation/types';

const FormItem = Form.Item;

export const SignInForm = () => {
  const [form] = Form.useForm();
  const [credential, setCredential] = useState<SignInBody>();
  const [token, setToken] = useState(storage.get(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(error);
  const dispatch = useDispatch();

  const onFinish = (credential: SignInBody) => {
    setCredential(credential);
  };

  useEffect(() => {
    if (!token&&credential) {

      setLoading(true);
      myCustomFetch<Token>('signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credential)
        })
        .then(x => setToken(x.token))
        .finally(() => setLoading(false))
        .catch(e => setError(e))
    }
  }, [credential]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token!==null) {
      storage.set(TOKEN_KEY, token);
      dispatch(tokenActions.set(token));
      token && navigate((location.state as NavigationState)?.from || '/');
     }
   }, [token])

  return (
    <Form 
      {...formLayout}
      form={form} 
      name='signin-form'
      initialValues={{ remember: true }}
      onFinish={onFinish} 
      autoComplete='off'
    >
      <Form.Item<SignInBody>
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item<SignInBody>
        label="Пароль"
        name="password"
      >
        <Input.Password />
      </Form.Item>

    <FormItem wrapperCol={{ span: 24, offset: 5 }}>
      <Space>
        <SubmitButton form={form}>Войти</SubmitButton>
      </Space>
    </FormItem>

    {error && <Alert message="Error" type="error" showIcon description={error.errors[0].message} />}
  </Form>
  );
}

SignInForm.displayName = 'SignInForm';
