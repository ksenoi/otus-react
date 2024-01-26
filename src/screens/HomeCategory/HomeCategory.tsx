import React, { FC, useState, useEffect, memo} from 'react';
import './HomeCategory.scss';
import { List } from 'src/components/List/List';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { CategoriesResponse } from 'src/components/Category/types';

type HomeCategoryProps = {
  handleCategory: Function
}

export const HomeCategory: FC<HomeCategoryProps> = memo(({handleCategory}) => {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    myCustomFetch<CategoriesResponse>('categories')
    .then(x => setCategories(x.data));
  }, [myCustomFetch]);  

  return (
    <div>
       <h2>Категории</h2>
       <hr/>
       <List>
        {
          categories.map(({name}, index) => 
          <li className='category' key={index} onClick={() => handleCategory(index)}>{name}</li>)}
       </List>
    </div>
  );
});
