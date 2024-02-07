import { Avatar, Button, List, Space } from 'antd';
import React, { memo } from 'react';
import { Product } from 'src/components/Product/types';

type HomeContentProps = {
  products: Product[],
  handleItemEdit: (product: Product) => void
  handleItemDelete: (product: Product) => void
}

export const ProductsUpdatable = memo<HomeContentProps>(({products, handleItemEdit, handleItemDelete}) => {
    return (
       <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button type='text' onClick={() => handleItemEdit(item)}>Изменить</Button>,
                <Button type='text' onClick={() => handleItemDelete(item)}>Удалить</Button>,              
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.photo} />}
                title={item.name}
              />
            </List.Item>
        )}
        />
  );
});

ProductsUpdatable.displayName = 'ProductsUpdatable';