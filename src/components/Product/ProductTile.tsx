import React, { FC, memo, useEffect } from 'react'
import './ProductTile.scss'
import { Product } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions, orderSelectors } from 'src/store/order';
import { RootState } from 'src/store';

type ProductTileProps = {
  product: Product;
}

export const ProductTile: FC<ProductTileProps> = memo(({product}) => {
  const dispatcher = useDispatch();
  const idInOrder = useSelector((state:RootState)=>orderSelectors.find(state,product.id));
  console.log({idInOrder});
  
  useEffect(()=>{},[idInOrder])
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
                {idInOrder?<button type='button' onClick={()=>dispatcher(orderActions.remove(product.id))}>Удалить из корзины</button>:
                <button type='button' onClick={()=>dispatcher(orderActions.add(product.id))}>Добавить в корзину</button>}
            </div>
          </div>
        </div>
    </div>
  );
});
