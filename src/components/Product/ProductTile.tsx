import React, { FC, memo} from 'react'
import './ProductTile.scss'
import { Product } from './types';
import { useDispatch } from 'react-redux';
import { orderActions } from 'src/store/order';
import { ProductTileButton } from 'src/components/ProductTileButton/ProductTileButton';

type ProductTileProps = {
  product: Product;
}

export const ProductTile: FC<ProductTileProps> = memo(({product}) => {
  const dispatcher = useDispatch();

  const handleOnClick = ((idInOrder: any) => {
    idInOrder 
    ? dispatcher(orderActions.remove(product.id), [idInOrder])
    : dispatcher(orderActions.add(product.id), [idInOrder])
  });
console.log(product.photo)
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
            <ProductTileButton id={product.id} handleClick={handleOnClick}></ProductTileButton>
          </div>
        </div>
    </div>
  );
});
