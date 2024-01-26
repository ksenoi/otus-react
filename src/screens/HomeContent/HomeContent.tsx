import React, { FC, useState, useEffect, memo, useMemo } from 'react';
import './HomeContent.scss';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { ProductsResponse, Product } from 'src/components/Product/types';
import { ProductTile } from 'src/components/Product/ProductTile';
import { ProductSortingBox } from 'src/components/ProductSortingBox/ProductSortingBox';

type HomeContentProps = {
  count: number
}

export const HomeContent: FC<HomeContentProps> = memo(({count}) => {
  const [categories, setCategories] = useState<Array<Product>>([]);

  console.log(`HomeContent categories ${categories.length} count ${count}`);  

  useEffect(() => {
    console.log(`HomeContent fetch`);  

    myCustomFetch<ProductsResponse>('products')
      .then(x => setCategories(count == null ? x.data : x.data.slice(0, count + 1)));
  }, [count, myCustomFetch]);

  return (
    <div>
       <ProductSortingBox/>
       <div className='products-catalog-tile'>
        {categories.slice(0,1).map((product, index) => 
          <ProductTile product={product} key={index}></ProductTile>)}
       </div>
    </div>
  );
});