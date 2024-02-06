import React, { FC, useState, useEffect, useCallback } from 'react';
import {HomeCategory} from '../HomeCategory/HomeCategory';
import {HomeContent} from '../HomeContent/HomeContent';
import './Home.scss';
import { ProductsResponse} from 'src/components/Product/types';
import {useCustomFetch, useLazyCustomFetch}  from 'src/client/myCustomFetch';
import { CategoriesResponse } from 'src/components/Category/types';
import { Category } from 'src/components/Category/types';

export const HomeScreen = () => {
  const [category, setCategory] = useState<Category>(null);
  const [productsUrl, setProductsUrl] = useState<string>('products');

  const handleCategory = useCallback((category: Category) => {
    setCategory(category);
    setProductsUrl(
      `/products/?${new URLSearchParams({
        categoryIds: JSON.stringify(category?.id),
      }).toString()}`

    );
  }, [category])

  const {data, loading, error} = useCustomFetch<CategoriesResponse>('categories');

  const [getProducts, {data: productData, loading: productLoading, error: productError}] 
    = useLazyCustomFetch<ProductsResponse>();

  useEffect(() => {
    getProducts(productsUrl)
    console.log(productsUrl)
  }, [category, getProducts]);

  return (
    <div>
      <div className="left">
        <HomeCategory data={data?.data} handleCategory={handleCategory}/>
      </div>
      <div className="right">
        <HomeContent products={productData?.data}></HomeContent>
      </div>
    </div> 
  );
};