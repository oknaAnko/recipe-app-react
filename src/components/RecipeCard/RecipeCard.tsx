import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title }: { id: number | string; title: string }) => {
  return (
    <div className='col'>
      <div className='card recipe-card'>
        <Link to={`/${id}`} className='btn btn-outline-info fw-bold'>
          <img src='https://via.placeholder.com/200x150' className='card-img-top p-2 img-fluid' alt='...' />
          <div className='card-body'>
            <h5 className='card-title d-flex align-items-center justify-content-center'>{title}</h5>
          </div>
        </Link>
        {/* EditMode: */}
        <div className='card-footer text-center'>
          <small className='text-muted'>
            <Link to={`/${id}/edit`} className='btn btn-primary btn-sm'>
              Edytuj
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
