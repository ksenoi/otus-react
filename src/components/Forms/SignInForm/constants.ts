export const validateMessages = {
  required: 'Введите ${label}',
  string: {
    min: '${label} слишком короткий',
    max: '${label} слишком длинный',
  },
  types: {
    email: 'Введите валидный ${label}',
  },
};

export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};