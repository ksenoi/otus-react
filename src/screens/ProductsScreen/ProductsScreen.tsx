import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { List } from 'src/components/List/List';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { CategoriesResponse } from 'src/components/Category/types';
import { Button, Input } from 'antd';

const AdminScreen = () => {
  const [categories, setCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    myCustomFetch<CategoriesResponse>('categories').then((x) => setCategories(x.data));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newCategories = [...categories];
    newCategories[index] = e.target.value;
    setCategories(newCategories);
  };

  const createCategory = () => {
    setDisabled(false);
    const newCategories = [...categories];
    newCategories.unshift('');
    setCategories(newCategories);
  };

  const editCategory = () => {
    setDisabled(false);
  };

  const saveCategory = () => {
    setDisabled(true);
  };

  const deleteCategory = () => {
    if (disabled) return;
    const newCategories = [...categories];
    newCategories.shift();
    setCategories(newCategories);
  };

  return (
    <div>
      <h2>Работа с категориями</h2>
      <hr />
      <Button type="primary" onClick={createCategory}>
        Создать
      </Button>
      <Button type="primary" onClick={editCategory}>
        Изменить
      </Button>
      <Button type="primary" onClick={saveCategory}>
        Сохранить
      </Button>
      <Button type="primary" onClick={deleteCategory}>
        Удалить
      </Button>

      <List>
        {categories.map(({ name }, index) => (
          <>
            <Input disabled={disabled} value={name} onChange={(e) => handleChange(e, index)} />
            <br />
          </>
        ))}
      </List>
    </div>
  );
};

export default AdminScreen;
