import React, { useEffect, useState } from 'react';
import { Alert, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { genWithSavingThunk, tokenActions, tokenSelectors } from 'src/store/token';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { SubmitButton } from "src/components/SubmitButton/SubmitButton";
import { validateMessages, formLayout } from './constants';

import { SignInBody, Token } from 'src/server.types';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { NavigationState } from 'src/navigation/types';
import { RootDispatch } from 'src/store';

const FormItem = Form.Item;

export const SignInForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, error } = useSelector(tokenSelectors.get);
  const dispatch: RootDispatch = useDispatch();

  //  const [credential, setCredential] = useState<SignInBody>();

  const onFinish = (credential: SignInBody) => {
    dispatch(genWithSavingThunk(credential));
  };

  useEffect(() => {
    token && navigate((location.state as NavigationState)?.from || '/');
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
