import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { orderSelectors } from 'src/store/order';

type ProductTileButtonProps = {
  id: any; 
  handleClick: (idInOrder: any) => void
}

export const ProductTileButton: FC<ProductTileButtonProps> = ({id, handleClick}) => {
  const idInOrder = useSelector((state:RootState)=>orderSelectors.find(state, id));

  console.log('ProductTileButton ' + id);
  console.log('ProductTileButton idInOrder ' + idInOrder);

  return (
    <div className='product-tile-button'>
      {idInOrder
        ? <button type='button' onClick={()=>handleClick(idInOrder)}>Удалить из корзины</button>
        : <button type='button' onClick={()=>handleClick(idInOrder)}>Добавить в корзину</button>
      }
    </div>
  );
}