import React, { memo, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';


import { RootDispatch } from 'src/store';
import { SignInBody, Token } from 'src/server.types';
import { useLocation, useNavigate } from 'react-router-dom';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { tokenActions } from 'src/store/token';
import { NavigationState } from 'src/navigation/types';



export const SingUpBlock = () => {


  const dispatch: RootDispatch = useDispatch();

  const [token, setToken] = useState(storage.get(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const onFinish = (credential: SignInBody) => {
    //console.log('Success:', credential);

    //dispatch(singUpTokenThunk({ ...credential, commandId: "otus_team_110" }))
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
          Зарегестрироваться
        </Button>
      </Form.Item>
      
      {error && <Alert message="Error" type="error" showIcon description={error.errors[0].message} />}
    </Form>
    

  );
};

SingUpBlock.displayName = 'SingUpBlock';
