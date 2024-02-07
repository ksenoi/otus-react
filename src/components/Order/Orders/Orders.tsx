
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { myCustomFetch, useCustomFetch } from 'src/client/myCustomFetch';
import { Product } from 'src/components/Product/types';
import { orderActions, orderSelectors } from 'src/store/order';
import { CartItem } from '../CartItem/CartItem';
import './style.scss'
import { Button } from 'antd';
import { Order, OrderStatus, OrdersResponse } from '../type';
import { OrderItem } from '../OrderItem/OrderItem';

export const Orders = () => {


  const [state,setState] = useState<number>();
  const [data,setData] = useState<OrdersResponse>();

  //const { data, loading, error } = useCustomFetch<OrdersResponse>('orders');


  useEffect(()=>{
    //const { data, loading, error } = useCustomFetch<OrdersResponse>('orders');
    myCustomFetch<OrdersResponse>('orders').then((x) => {
      console.log("Load orders",x);
      setData(x);
    })
    setData(data);
  },[state])

  const onReload = ()=>{
    
    const newState= state+1<100?state+1:1;
    console.log("Reload",newState);
    setState(newState);
  }

  
  
  return (
    data ?

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
            {data.data?.map((order, index) => {
              return <OrderItem order={order} onreload={onReload} key={index}></OrderItem>
            })}
          </tbody>
        </table>

      </div> :
      <div></div>

  );
};
