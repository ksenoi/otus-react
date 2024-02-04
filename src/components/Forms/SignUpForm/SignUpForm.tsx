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
import { RootDispatch } from 'src/store';

const FormItem = Form.Item;

export const SignUpForm = () => {
  const [form] = Form.useForm();
  const dispatch: RootDispatch = useDispatch();
  const [token, setToken] = useState(storage.get(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = (credential: SignInBody) => {
    myCustomFetch<Token>('signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...credential, commandId: "otus_team_110" })
        })
        .then(x => setToken(x.token))
        .finally(() => setLoading(false))
        .catch(e => setError(e))
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token!==null) {
      storage.set(TOKEN_KEY, token);
      dispatch(tokenActions.set(token));
      token && navigate((location.state as NavigationState)?.from || '/');
    }
  }, [token])

  const validatePassword = (_: any, value: string ) => {
    const passwordRegExp = /^[a-zA-Z0-9]*$/; 
    if (passwordRegExp.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('${label} может содержать только буквы латинского алфавита и цифры'));
  };

  return (
    <Form 
      {...formLayout}
      form={form} 
      name='signin-form'
      initialValues={{ remember: true }}
      onFinish={onFinish} 
      validateMessages={validateMessages}
      autoComplete='off'
    >
      <Form.Item<SignInBody>
        label="Email"
        name="email"
        rules={[{ 
          required: true,
          type: "email",
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<SignInBody>
        label="Пароль"
        name="password"
        rules={[
          {required: true},
          {min: 3},
          {validator: validatePassword
        }]}        
      >
        <Input.Password />
      </Form.Item>
      <FormItem wrapperCol={{ span: 24, offset: 5 }}>
        <Space>
          <SubmitButton form={form}>Зарегистрироваться</SubmitButton>
        </Space>
      </FormItem>
      {error && <Alert message="Error" type="error" showIcon description={error.errors[0].message} />}
    </Form>
  );
}
