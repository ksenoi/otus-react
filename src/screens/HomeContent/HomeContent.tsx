import React, { memo } from 'react';
import './HomeContent.scss';
import { Product } from 'src/components/Product/types';
import { ProductTile } from 'src/components/Product/ProductTile';
import { ProductSortingBox } from 'src/components/ProductSortingBox/ProductSortingBox';

type HomeContentProps = {
  products: Product[]
}

export const HomeContent = memo<HomeContentProps>(({products}) => {
  return (
    <div>
       <ProductSortingBox/>
       <div className='products-catalog-tile'>
        {products?.map((product, index) => 
          <ProductTile product={product} key={index}></ProductTile>)}
       </div>
    </div>
  );
});

HomeContent.displayName = 'HomeContent';