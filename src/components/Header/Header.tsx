import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleOnLoginClick = () => {
    console.log('open loginform');
  };

  const handleOnRegisterClick = () => {
    console.log('open loginform');
  };

  return (
    <header className='border-bottom bg-light navbar-light shadow-sm'>
      <div className='max-width mx-auto'>
        <nav className='navbar navbar-expand-md border-bottom'>
          <div className='container-fluid justify-content-around'>
            <Link to='/' className='navbar-brand fw-bold'>
              aA
            </Link>
            <h1>
              <Link to='/' className='navbar-brand'>
                Kuchnia bez jajka i pszenicy
              </Link>
            </h1>
            <div>
              <button className='btn btn-outline-primary btn-sm ms-2' onClick={handleOnLoginClick}>
                Zaloguj się
              </button>
              <button className='btn btn-primary btn-sm ms-2' onClick={handleOnRegisterClick}>
                Załóż konto
              </button>
            </div>
          </div>
        </nav>
        <nav className='navbar navbar-expand-md'>
          <div className='container-fluid'>
            <div
              className='d-flex justify-content-between collapse navbar-collapse bg-light py-2'
              id='navbarSupportedContent'>
              <Link to={`/przepisy`} className='btn btn-light text-uppercase' role='button'>
                Wszystkie przepisy
              </Link>
              <Link to={`/add`} className='btn btn-success' role='button'>
                Utwórz przepis
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
