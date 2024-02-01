import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';

import { SignInBody, Token } from 'src/server.types';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { useDispatch } from 'react-redux';
import { tokenActions } from 'src/store/token';






export const SingInBlock = () => {


  const [credential, setCredential] = useState<SignInBody>();

  const [token, setToken] = useState(storage.get(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log('1 token:', token);
  const dispatch = useDispatch();

  const onFinish = (credential: SignInBody) => {
   // console.log('Success:', credential);
    setCredential(credential);

  };

  useEffect(() => {
    //console.log('useEffect:', credential);
    
    if (!token&&credential) {

      //console.log('useEffect2:', credential);
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
      //console.log("onFinish");
    }
  }, [credential]);


  const onFinishFailed = (errorInfo: any) => {
    //console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    //console.log("tokenuseEffect", token);
    //console.log("tokenuseEffect2", location.state);
    if (token!==null) {
      
      storage.set(TOKEN_KEY, token);
      dispatch(tokenActions.set(token));
      token && navigate((location.state as NavigationState)?.from || '/');
      
    }

  }, [token])

  return (
    token ? <div>Выйти</div> :
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<SignInBody>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignInBody>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
        {error && <Alert message="Error" type="error" showIcon description={error} />}

      </Form>

  );
};

SingInBlock.displayName = 'SingInBlock';
