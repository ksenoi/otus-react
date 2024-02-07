import React, { useCallback, useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import { Modal } from 'src/components/Modal/Modal';
import { ProductForm } from 'src/components/Forms/ProductForm/ProductForm';
import { myCustomFetch, useCustomFetch, useLazyCustomFetch } from 'src/client/myCustomFetch';
import { CategoriesResponse } from 'src/components/Category/types';
import { Product, ProductsResponse } from 'src/components/Product/types';
import { ProductsUpdatable } from 'src/components/ProductsUpdatable/ProductsUpdatable';
import { CreateProduct, DeleteProduct, UpdateProduct } from 'src/services/products';

export const ProductsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<Product>()

  const {data, loading, error} = useCustomFetch<CategoriesResponse>('categories');

  const handleUpdate = (data: Product) => {
    if (!data.id) {
      CreateProduct(data);
    }
    else {
      UpdateProduct(data);
    }
    setProduct(data);
    setVisible(false);
  };

  const handleProductDelete = (data: Product) => {
    DeleteProduct(data);
    setProduct(data);
  }

  const handleProductCreate = () => {
    setProduct(null);
    setVisible(true);
  }
  const handleProductEdit = (data: Product) => {
    setProduct(data);
    setVisible(true);
  }

  const [getProducts, {data: productData, loading: productLoading, error: productError}] = useLazyCustomFetch<ProductsResponse>();
    useEffect(() => {
      getProducts('products')
  }, [product, getProducts]);

  return (
    <div className='products'>
      <div className={'products-create'}>
        <Button type="default" onClick={handleProductCreate}>Создать</Button>
      </div>
      <Divider />
      <ProductsUpdatable products={productData?.data} handleItemDelete={handleProductDelete} handleItemEdit={handleProductEdit}/>
      <Modal visible={visible} setVisible={setVisible} title="Создание товара">
        <ProductForm categories={data?.data} data={product} onSubmit={handleUpdate} />  
      </Modal> 
    </div>
  );
};

ProductsScreen.displayName = 'ProductsScreen'