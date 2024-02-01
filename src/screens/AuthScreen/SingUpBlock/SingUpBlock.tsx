import React, { memo, useEffect, useMemo } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';


import { RootDispatch } from 'src/store';
import { SignInBody, SignUpBody } from 'src/server.types';
import { useLocation, useNavigate } from 'react-router-dom';



export const SingUpBlock = () => {


  const dispatch: RootDispatch = useDispatch();


  //const token = useSelector(tokenSelectors.get)
  //const error = useSelector(tokenSelectors.error)
  

  //const onSubmit:SubmitHandler<SignInBody> = (credential:SignInBody)=>dispatch(singInTokenThunk(credential));

  //const {register,handleSubmit,formState: { errors } } = useForm();

  const onFinish = (credential: SignInBody) => {
    //console.log('Success:', credential);

    //dispatch(singUpTokenThunk({ ...credential, commandId: "otus_team_110" }))
  };

  const onFinishFailed = (errorInfo: any) => {
    //console.log('Failed:', errorInfo);
  };

  

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
      

    </Form>

  );
};

SingUpBlock.displayName = 'SingUpBlock';
