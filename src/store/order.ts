import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';



type Order={
  products:[{productId:string}]
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {products:[]},
  reducers: {
    set: (_, action: PayloadAction<Order>) => action.payload,
    add: (state, action: PayloadAction<string>) => {
      console.log(state);
      console.log(action.payload);
      if(!state.products.find((p: string)=>p===action.payload)){
        state.products.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      console.log(state);
      state.products = state.products.filter((p: string)=>p!==action.payload)
    },
  },
});

export const orderActions = orderSlice.actions;

export const orderSelectors = {
  get: (state: RootState): RootState['order'] => state.order,
  find: (state: RootState, id:string): RootState['order'] => state.order.products.find((p: string)=>p===id),
};

export const order = orderSlice.reducer;
