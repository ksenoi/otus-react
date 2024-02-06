import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import { Modal } from '../Modal/Modal';
import { ProductForm } from '../Forms/ProductForm/ProductForm';
import { myCustomFetch, useCustomFetch } from 'src/client/myCustomFetch';
import { CategoriesResponse } from '../Category/types';
//import { Product } from '../Product/types';
import { Product } from 'src/components/Product/types';

export const ProductsCreate: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const {data, loading, error} = useCustomFetch<CategoriesResponse>('categories');

  const handleUpdate = (product: Product) => {
    console.log(product)
    if (!product.id) {
      myCustomFetch<Product>('products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      //.then((x) => setCategories([...categories, {name: updCategory.name, id: x.id}]));
    }
    setVisible(false);
    // else {
    //     myCustomFetch<Category>(`categories/${updCategory.id}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({name : updCategory.name})
    //     }).then((x) => {
    //       const index = categories.findIndex((x) => {
    //         return x.id === updCategory.id
    //       });
    //       if (index !== -1){
    //         categories.splice(index, 1, {name: updCategory.name, id: updCategory.id})
    //         setCategories([...categories]);
    //       }
    //     });
    // }
};

  return (
    <>
      <div className={'products-create'}>
        <Button type="default" onClick={() => setVisible(!visible)}>Создать</Button>
      </div>
      <Modal visible={visible} setVisible={setVisible} title="Создание товара">
        <ProductForm categories={data?.data} 
        
          onSubmit={handleUpdate}
        />  
      </Modal> 
    </>
  );
};
