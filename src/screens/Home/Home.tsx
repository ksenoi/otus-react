import React, { FC } from 'react';
import HomeCategory from '../HomeCategory/HomeCategory';
import HomeContent from '../HomeContent/HomeContent';
import './Home.scss';

export const HomeScreen: FC = () => {
   return (
    <div>
      <div className="left">
        <HomeCategory/>
      </div>

      <div className="right">
        <HomeContent/>
      </div>
    </div> 
  );
};

export default HomeScreen;
