import React, { useState } from 'react';
import "./CategoryModal.scss"
import { Category } from 'src/components/Category/types';

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
        <input value={data.name} onChange={handleChangeName}/>
        <div>
          <button onClick={() => {
            onSave(data);
            onClose();
          }}>Сохранить</button>
          <button onClick={() => {
            onDelete(data);
            onClose();
          }}>Удалить</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};
