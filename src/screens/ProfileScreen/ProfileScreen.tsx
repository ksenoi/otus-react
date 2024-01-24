import { Alert, Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Profile } from "src/server.types";
import { RootDispatch } from 'src/store';
import { tokenActions, tokenSelectors } from "src/store/token"


export const ProfileScreen = () => {

    const profile: Profile = useSelector(tokenSelectors.getPofile);

    const onFinish = (profile: Profile) => {
        console.log('Success:', profile);


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const dispatch: RootDispatch = useDispatch();
    const onClickExit = () => dispatch(tokenActions.logout());


    return (

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={profile}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<Profile>
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input disabled={true}
                />
            </Form.Item>

            <Form.Item<Profile>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input disabled={true} />
            </Form.Item>

            <Form.Item<Profile>
                label="Дата регистрации"
                name="signUpDate"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input disabled={true} />
            </Form.Item>

            <Form.Item<Profile>
                label="ID команды"
                name="commandId"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input
                    disabled={true} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="button" onClick={onClickExit}>
                    Выйти
                </Button>
            </Form.Item>






        </Form>

    );
};

export default ProfileScreen;