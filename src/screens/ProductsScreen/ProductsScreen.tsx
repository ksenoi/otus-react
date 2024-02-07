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
  const [productData, setProductData] = useState<Product[]>()

  const {data: categoryData, loading: categoryLoading, error: categoryError} = useCustomFetch<CategoriesResponse>('categories');

  const getProducts = () => {
    return myCustomFetch<ProductsResponse>('products').then(p => setProductData(p?.data))
  }
  
  const handleProductCreate = () => {
    setVisible(true);
  }

  const handleUpdate = (value: Product) => {
    if (!value.id) {
      CreateProduct(value);
    }
    else {
      UpdateProduct(value);
    }
    setVisible(false);
    setProduct(value);
  };

  const handleProductDelete = (value: Product) => {
    DeleteProduct(value);
    setProduct(value);
  }

  const handleProductEdit = (value: Product) => {
    setProduct(value);
    setVisible(true);
  }
  
  useEffect(() => {
    getProducts();
  }, [product])

  console.log(1);
  return (
    <div className='products'>
      <div className={'products-create'}>
        <Button type="default" onClick={handleProductCreate}>Создать</Button>
      </div>
      <Divider />
      <ProductsUpdatable products={productData} handleItemDelete={handleProductDelete} handleItemEdit={handleProductEdit}/>
      <Modal visible={visible} setVisible={setVisible} title="Создание товара">
        <ProductForm categories={categoryData?.data} data={product} onSubmit={handleUpdate} />  
      </Modal> 
    </div>
  );
};

ProductsScreen.displayName = 'ProductsScreen'