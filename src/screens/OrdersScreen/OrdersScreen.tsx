import React from 'react';
import { Cart } from 'src/components/Order/Cart/Cart';
import { Orders } from 'src/components/Order/Orders/Orders';

export const OrdersScreen = () => {
  return (
    <div>
      <Cart/>
      <Orders/>
      
    </div> 
  );
};