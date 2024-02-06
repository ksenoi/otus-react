import React from 'react';
import "./ProductForm.scss"
import { SubmitButton } from 'src/components/SubmitButton/SubmitButton';
import { Form, Input, InputNumber, Select } from 'antd';
import { formLayout } from './constants';
import { Category } from 'src/components/Category/types';
import { Product } from 'src/components/Product/types';

const { Option } = Select;

type Props = {
  data?: Product;
  categories: Category[];
  onSubmit: (product: Product) => void
}

export const ProductForm = ({data, categories, onSubmit} : Props) => {
  const [form] = Form.useForm();
  const product: Product = data || {name: '', price: 0, categoryId: ''};

  const onCategoryChange = (value: string) => {
    product.categoryId = value;
  }

  return (
    <Form className='form'
    {...formLayout}
    form={form} 
    name='product-form'
    initialValues={product} 
    onFinish={onSubmit}
    autoComplete='off'
  >
  <Form.Item<Product>
    label='Наименование'
    name='name'
    rules={[
      { required: true}, 
      { min: 3 },
      { max: 32 },
    ]}
  >
    <Input placeholder='Введите наименование товара' value={data?.name}/> 
  </Form.Item>
  <Form.Item
      label='Категория'
      name='categoryId'
      valuePropName='category'
      rules={[
        { required: true}, 
      ]}
  >
    <Select
          placeholder="Выберите категорию"
          onChange={onCategoryChange}
          allowClear
        >
          {categories.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
    </Select>    
  </Form.Item>   
  <Form.Item<Product>
    label='Описание'
    name='desc'
  >
    <Input value={data?.desc}/> 
  </Form.Item>
  <Form.Item<Product>
      label='Изображение'
      name='photo'
  >
    <Input value={data?.photo}/> 
  </Form.Item>   
  <Form.Item<Product>
      label='Цена'
      name='price'
      rules={[
        { required: true}, 
        { type: 'number' },
      ]}
  >
    <InputNumber value={data?.oldPrice}/> 
  </Form.Item>   
  <Form.Item<Product>
      label='Старая цена'
      name='oldPrice'
      rules={[
        { type: 'number' },
      ]}
  >
    <InputNumber value={data?.price}/> 
  </Form.Item>
  <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
      <SubmitButton form={form}>Сохранить</SubmitButton>
  </Form.Item>
  </Form>
  )
};