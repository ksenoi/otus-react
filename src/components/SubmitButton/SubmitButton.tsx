import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';

type SubmitButtonProps = {
  form: FormInstance,
  children: string
}

export const SubmitButton = ({ form, children }: SubmitButtonProps) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};