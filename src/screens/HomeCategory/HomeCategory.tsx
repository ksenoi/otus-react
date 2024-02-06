import React, {memo} from 'react';
import './HomeCategory.scss';
import { List, Avatar } from 'antd';
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
       <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item onClick={() => handleCategory(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.photo} />}
                title={item.name}
              />
            </List.Item>
          )}
        />
    </div>
  );
});

HomeCategory.displayName = 'HomeCategory';
