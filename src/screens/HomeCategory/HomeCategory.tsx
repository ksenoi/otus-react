import React, {memo} from 'react';
import './HomeCategory.scss';
import { List } from 'src/components/List/List';
import { Category } from 'src/components/Category/types';

type HomeCategoryProps = {
  data: Category[]
  handleCategory: (category: Category) => void
}

export const HomeCategory = memo<HomeCategoryProps>(({data, handleCategory}) => {
  if (!data?.length) return null;

  return (
    <div>
       <h2>Категории</h2>
       <hr/>
       <List>
        {
          data.map((item, index) => 
          <li className='category' key={index} onClick={() => handleCategory(item)}>{item.name}</li>)}
       </List>
    </div>
  );
});

HomeCategory.displayName = 'HomeCategory';
