import React, { ReactNode } from 'react';
import { Alert, Form } from 'antd';

type FormWrapperProps = {
  children? : ReactNode,
  error?: any,
  loading?: any
}

export const FormWrapper = ( {children, error, loading} : FormWrapperProps) => {

  return (
    error && <Form><Alert message="Ошибка" type="error" showIcon description={error?.toString()} /></Form>
      || (loading && <Form><Alert message="Загрузка" type="info" showIcon /></Form>)
      || children
  )
};
