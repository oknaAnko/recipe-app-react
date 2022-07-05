import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRecipesError } from '../../store/recipes/selectors';

const ErrorPage = () => {
  const error = useSelector(getRecipesError);
  const { status, statusText } = error;

  return (
    <div className='content max-width mx-auto pt-5'>
      <section className='container text-center'>
        {status === 404 ? <h1>Page Not Found </h1> : <h1>Error!</h1>}
        <h2 className='my-4'>
          status błędu: {status} {statusText}
        </h2>
        <Link to='/przepisy' className='btn btn-primary' role='button'>
          Powrót
        </Link>
      </section>
    </div>
  );
};

export default ErrorPage;
