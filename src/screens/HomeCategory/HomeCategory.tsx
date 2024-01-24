import React, { FC, useState, useEffect } from 'react';
import './HomeCategory.scss';
import { List } from 'src/components/List/List';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { CategoriesResponse } from 'src/components/Category/types';

export const HomeCategory: FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    myCustomFetch<CategoriesResponse>('categories')
      .then(x => setCategories(x.data));
  }, []);  

  return (
    <div>
       <h2>Категории</h2>
       <hr/>
       <List>
        {categories.map(({name}, index) => 
          <li className='category' key={index}>{name}</li>)}
       </List>
    </div>
  );
};

export default HomeCategory;
