import React, { ChangeEvent, ChangeEventHandler, useEffect, useState, useCallback } from 'react';
import { List } from 'src/components/List/List';
import { CategoriesResponse, Category } from 'src/components/Category/types';
import { CategoryModal } from 'src/components/CategoryModal/CategoryModal';
import { Button, Input } from 'antd';
import {useCustomFetch, myCustomFetch}  from 'src/client/myCustomFetch';
import { createPortal } from "react-dom";

const CategoryScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    myCustomFetch<CategoriesResponse>('categories')
       .then(x => {setCategories(x?.data || [])})
  }, []);

  const handleUpdate = useCallback((updCategory: Category) => {
    if (categories.some((item) => {return item.name == updCategory.name})) return;
    if (!updCategory.id) {
      const newCategory = myCustomFetch<Category>('categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name : updCategory.name})
      }).then((x) => setCategories([...categories, {name: updCategory.name, id: x.id}]));
    }
    else {
        myCustomFetch<Category>(`categories/${updCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name : updCategory.name})
        }).then((x) => {
          const index = categories.findIndex((x) => {
            return x.id === updCategory.id
          });
          if (index !== -1){
            categories.splice(index, 1, {name: updCategory.name, id: updCategory.id})
            setCategories([...categories]);
          }
        });
    }
}, [category])

  const handleDelete = useCallback((delCategory: Category) => {
    if (!category.id) return;
    myCustomFetch<Category>(`categories/${delCategory.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id : delCategory.id})
    }).then((x) => {
      setCategories(categories.filter((x) => {return x.id !== delCategory.id}))});
  }, [category])

  return (
    <div>
       {createPortal(
        <CategoryModal isShow={showModal} category={category} onClose={() => setShowModal(false)} onSave={handleUpdate} onDelete={handleDelete}/>
       , document.body
       )}
       <h2>Работа с категориями</h2>
       <Button onClick={() => {
          setCategory({name: 'Новая Категория', id: ''});
          setShowModal(true);
        }
        }>Создать</Button>
       <hr />
       <List>
        {
          categories.map((item, index) => 
          <li className='category' key={index} onDoubleClick={() => {
            setCategory(item);
            setShowModal(true);
          }
          }>{item.name}</li>)}
       </List>
    </div>
  );
};

export default CategoryScreen;
