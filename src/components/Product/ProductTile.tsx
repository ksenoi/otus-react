import React, { FC, memo } from 'react'
import './ProductTile.scss'
import { Product } from './types';

type ProductTileProps = {
  product: Product;
}

export const ProductTile: FC<ProductTileProps> = memo(({product}) => {
  return (
    <div className='productshort'>
        <div className='productshort__imgBox'>
          <img className='productshort__image' src={`${product.photo}`} alt={product.name} />
        </div>
        <div className='productshort__body'>
          <div className='productshort__content'>
            <h1>
              {product.name}
            </h1>
            <p>
              {product.desc}
            </p>
          </div>
          <div className='productshort__info'>
            <div className='productshort__price'>
              {product.price} Р
            </div>
            <div className='productshort__button'>
              {/* <ButtonAddToCart count={0}></ButtonAddToCart> */}
            </div>
          </div>
        </div>
    </div>
  );
});
