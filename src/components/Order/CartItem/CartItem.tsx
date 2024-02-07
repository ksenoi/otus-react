import React, { FC, memo } from 'react'
import './style.scss'

import { useDispatch } from 'react-redux';

import { Product } from 'src/components/Product/types';
import { useCustomFetch } from 'src/client/myCustomFetch';
import { FormWrapper } from 'src/components/FormWrapper/FormWrapper';
import { Button } from 'antd';
import { orderActions } from 'src/store/order';

type CartItemProps = {
  productId: string;
}

export const CartItem = memo<CartItemProps>(({ productId }) => {

  
  const { data, loading, error } = useCustomFetch<Product>('products/' + productId);
  

  const dispatcher = useDispatch();

  const OnClickDelete = ()=>{
    dispatcher(orderActions.remove(productId))
  }


    
  return (

    data ? <tr>
      <td>
        {data.name}
      </td>
      <td>
        {data.desc}
      </td>
      <td>
        {data.price} Р
      </td>
      <td>
        <Button onClick={OnClickDelete}>Удалить</Button>
      </td>
    </tr>
      : <tr></tr>

  );
});
