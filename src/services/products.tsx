import { myCustomFetch, useCustomFetch } from "src/client/myCustomFetch";
import { Product } from "src/components/Product/types";

export const CreateProduct = (data: Product) => {
  myCustomFetch<Product>('products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export const UpdateProduct = (data: Product) => {
  myCustomFetch<Product>(`products/${data?.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export const DeleteProduct = (data: Product) => {
  myCustomFetch<Product>(`products/${data?.id}`, 
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
}