import React, { FC, useState, useEffect, useCallback } from 'react';
import {HomeCategory} from '../HomeCategory/HomeCategory';
import {HomeContent} from '../HomeContent/HomeContent';
import './Home.scss';

export const HomeScreen = () => {
  const [category, setCategory] = useState(null);

  console.log(`Home`);  

  const handleCategory = useCallback((id: number) => {
    setCategory(id);
  }, [])

  return (
    <div>
      <div className="left">
        <HomeCategory handleCategory={handleCategory}/>
      </div>
      <div className="right">
        <HomeContent count={category}></HomeContent>
      </div>
    </div> 
  );
};