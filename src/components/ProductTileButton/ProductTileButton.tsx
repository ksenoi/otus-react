import { Button } from 'antd';
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { orderSelectors } from 'src/store/order';
import './ProductTileButton.scss';

type ProductTileButtonProps = {
  id: any; 
  handleClick: (idInOrder: any) => void
}

export const ProductTileButton: FC<ProductTileButtonProps> = ({id, handleClick}) => {
  const idInOrder = useSelector((state:RootState)=>orderSelectors.find(state, id));

  return (
    <div className='button-box'>
      {idInOrder
        ? <Button type='primary' onClick={()=>handleClick(idInOrder)}>Удалить</Button>
        : <Button type='primary' onClick={()=>handleClick(idInOrder)}>В корзину</Button>
      }
    </div>
  );
}