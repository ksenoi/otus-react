import React, { FC, useState, useEffect } from 'react';
import './HomeContent.scss';
import { List } from 'src/components/List/List';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { ProductsResponse, Product } from 'src/components/Product/types';
import { ProductTile } from 'src/components/Product/ProductTile';

export const HomeContent: FC = () => {
  const [categories, setCategories] = useState<Array<Product>>([]);

  useEffect(() => {
    myCustomFetch<ProductsResponse>('products')
      .then(x => setCategories(x.data));
  }, []);  

  return (
    <div>
       <h2>Товары</h2>
       <hr/>
       <div className='products-catalog-tile'>
        {categories.map((product, index) => 
          <ProductTile product={product}></ProductTile>)}
       </div>
    </div>
  );
};

export default HomeContent;

{/* // <div className='product' key={index}>{name}</div>)}
          // <div></div> */}
