import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { RootDispatch } from 'src/store';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { tokenActions } from 'src/store/token';
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { Profile } from "src/server.types";
import { SubmitButton } from "src/components/SubmitButton/SubmitButton";
import { validateMessages, formLayout } from './constants';

const FormItem = Form.Item;

type ProfileFormProps = {
  data: Profile;
}

export const ProfileForm = ( {data} : ProfileFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (value: Profile) => {
  }

  const validateWordWithStartingLetters = (_: any, value: string ) => {
    const regExpression = /^[a-zA-Z]+[a-zA-Z1-9]*$/; 
    if (regExpression.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('${label} содержит недопустимое значение'));
  };

  const navigate = useNavigate();

  const dispatch: RootDispatch = useDispatch();

  const onClickExit = () => {
    storage.remove(TOKEN_KEY);
    dispatch(tokenActions.logout());
    navigate("/auth");
  };

  return (
    <Form 
      {...formLayout}
      form={form} 
      name='profile-form'
      initialValues={data} 
      onFinish={onFinish} 
      validateMessages={validateMessages}
      autoComplete='off'
    >
    <Form.Item<Profile>
      label='Имя'
      name='name'
      rules={[
        { required: true}, 
        { min: 3 },
        { max: 32 },
        { validator: validateWordWithStartingLetters }
      ]}
    >
      <Input placeholder='Введите латинские буквы и цифры без пробелов (3-32 символов)' value={data?.name}/> 
    </Form.Item>
    <Form.Item<Profile>
      label='Email'
      name='email'
    >
      <Input disabled={true} value={data?.email}/> 
    </Form.Item>
    <Form.Item<Profile>
        label='Дата регистрации'
        name='signUpDate'
      >
      <Input disabled={true} value={data?.signUpDate?.toString()}/> 
      </Form.Item>   
    <FormItem wrapperCol={{ span: 24, offset: 5 }}>
      <Space>
        <SubmitButton form={form}>Сохранить</SubmitButton>
        <Button type='default' onClick={onClickExit}>Выйти</Button>
      </Space>
    </FormItem>
  </Form>
  );
}
