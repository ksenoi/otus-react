import React, { FC, useState, useEffect } from 'react';
import './ProductSortingBox.scss';
import {ArrowUpOutlined} from '@ant-design/icons'

export const ProductSortingBox = () => {
  return (
    <div className='sort__list'>
      <div className='sort__item'>
        <a className='sort__item__link'>По наименованию</a>
          <div>
            <ArrowUpOutlined rotate={180} />
          </div>
      </div>
    </div> 
  );
};