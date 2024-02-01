import { Alert, Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Profile } from "src/server.types";
import { RootDispatch } from 'src/store';
//import { tokenActions, tokenSelectors } from "src/store/token"
import { TOKEN_KEY, storage } from 'src/client/storahe';
import { tokenActions } from 'src/store/token';
import { useNavigate } from 'react-router-dom';
import { useCustomFetch } from 'src/client/myCustomFetch';


export const ProfileScreen = () => {

    

    const onFinish = (profile: Profile) => {
        console.log('Success:', profile);


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };``

    const navigate = useNavigate();

    const dispatch: RootDispatch = useDispatch();
    const onClickExit = () => {
        dispatch(tokenActions.logout());
        storage.remove(TOKEN_KEY);
        navigate("/auth");
    };

    const {data, loading, error} = useCustomFetch<Profile>('profile');

    console.log(data);
    console.log({error});


    return (
        error?<Form><Alert message="Error" type="error" showIcon description={error} /></Form>:
        data?<div>
        
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={data}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<Profile>
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите Имя!' }]}
            >
                <Input disabled={true}  value={data.name}
                />
            </Form.Item>

            <Form.Item<Profile>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input disabled={true} value={data.email}/>
            </Form.Item>

            <Form.Item<Profile>
                label="Дата регистрации"
                name="signUpDate"
                rules={[{ required: true, message: 'Введите дату регистрации!' }]}
            >
                <Input disabled={true}  />
            </Form.Item>

            <Form.Item<Profile>
                label="ID команды"
                name="commandId"
                rules={[{ required: true, message: 'Введите email!' }]}
            >
                <Input
                    disabled={true} value={data.commandId}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="button" onClick={onClickExit}>
                    Выйти
                </Button>
            </Form.Item>
        </Form></div>
        :<Form><Alert message="Загрузка"
        description="Загрузка"
        type="info"
        showIcon /></Form>

    );
};

export default ProfileScreen;