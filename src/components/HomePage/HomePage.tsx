import React, { useEffect } from 'react';

import food from '../../img/food1.jpg';
import paper from '../../img/paper 1280x1280.jpg';
// import SearchBar from '../SearchBar/SearchBar';

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${food})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = '0 80px';
    return () => {
      document.body.style.backgroundImage = `url(${paper})`;
    };
  }, []);

  return (
    <div>
      <section className='container home-page-styles'>
        <div className='home-page'>
          <p className='display-3 fw-bold mb-4'>Znajdź swój ulubiony przepis</p>
          {/* <SearchBar /> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
