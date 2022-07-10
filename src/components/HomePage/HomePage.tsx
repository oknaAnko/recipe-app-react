import React, { useEffect } from 'react';

import food from '../../img/food1.jpg';
import paper from '../../img/paper 1280x1280.jpg';
import SearchBar from '../SearchBar/SearchBar';

const Home = () => {
  return (
    <div className='background-image content'>
      <div className='max-width mx-auto pt-5'>
        <section className='container home-page-styles'>
          <div className='home-page'>
            <p className='display-3 fw-bold mb-4'>Znajdź swój ulubiony przepis</p>
            <SearchBar />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
