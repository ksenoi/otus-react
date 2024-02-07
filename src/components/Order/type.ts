import { Product } from "../Product/types";


export enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}

export interface OrderProduct {
  _id?: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  products: OrderProduct[];
  //user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersResponse{
  data: Order[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  }
}
