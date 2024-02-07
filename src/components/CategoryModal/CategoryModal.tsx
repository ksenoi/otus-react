import React, { useState } from 'react';
import "./CategoryModal.scss"
import { Category } from 'src/components/Category/types';
import { Button, Form, Input } from 'antd';

type Props = {
  isShow: boolean;
  category: Category;
  onClose: () => void;
  onSave: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export const CategoryModal = ({ isShow, category, onClose, onSave, onDelete }: Props) => {
  if (!isShow) return null;
  
  const [data, setCategory] =  useState(category);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({id: category.id, name: event.target.value});
  };

  return (
    <div className="details-modal-overlay" 
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        onClose();
      }}
    >
      <div className="details-modal">
        <Form>
        <Input value={data.name} onChange={handleChangeName}/>
        <div>
          <Button onClick={() => {
              onSave(data);
              onClose();
            }}>
            Сохранить
          </Button>
          <Button onClick={() => {
              onDelete(data);
              onClose();
            }}>
              Удалить
          </Button>
          <Button onClick={onClose}>
              Закрыть
          </Button>
        </div>
        </Form>
      </div>
    </div>
  );
};
