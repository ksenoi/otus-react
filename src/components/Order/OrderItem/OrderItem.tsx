import React, { FC, memo } from 'react'
import './style.scss'

import { useDispatch } from 'react-redux';

import { Product } from 'src/components/Product/types';
import { myCustomFetch, useCustomFetch } from 'src/client/myCustomFetch';
import { FormWrapper } from 'src/components/FormWrapper/FormWrapper';
import { Button } from 'antd';
import { orderActions } from 'src/store/order';
import { Order } from '../type';

type OrderItemProps = {
  order: Order;
  onreload:Function;
}

export const OrderItem = memo<OrderItemProps>(({order,onreload}) => {

  
  

  const OnClickDelete = ()=>{
    const newCategory = myCustomFetch('orders/'+order.id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
      
    }).then((x) => {
      console.log("Delete order",x);
      onreload();
    });
  }

  console.log({order});
    
  return (

    <tr>
      <td>
        {order.createdAt as any}
      </td>
      <td>
        {order.status}
      </td>
      
      <td>
        <Button onClick={OnClickDelete}>Удалить</Button>
      </td>
    </tr>
      

  );
});
