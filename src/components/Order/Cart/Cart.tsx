
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { myCustomFetch, useCustomFetch } from 'src/client/myCustomFetch';
import { Product } from 'src/components/Product/types';
import { orderActions, orderSelectors } from 'src/store/order';
import { CartItem } from '../CartItem/CartItem';
import './style.scss'
import { Button } from 'antd';
import { Order, OrderStatus } from '../type';

export const Cart = () => {


  const dispatcher = useDispatch();

  const order = useSelector(orderSelectors.get);



  type Params = {
    products: Array<{
      id: string;
      quantity: number;
    }>;
    status?: OrderStatus;
  };

  const OnClickSaveOrder = () => {

    const params: Params = { products: [] };

    order.products.map(p => { params.products.push({ id: p, quantity: 1 }); });

    const newCategory = myCustomFetch<Order>('orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then((x) => {
      dispatcher(orderActions.clear());

    });

  }


  return (
    order.products && order.products.length > 0 ?
      <div>
        Корзина
        <table className='table'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>цена</th>
            </tr>
          </thead>

          <tbody>
            {order.products?.map((product, index) => {
              return <CartItem productId={product} key={index}></CartItem>
            })}
          </tbody>
        </table>
        <Button onClick={OnClickSaveOrder}>Сохранить заказ</Button>
      </div> :
      <div></div>
  );
};
