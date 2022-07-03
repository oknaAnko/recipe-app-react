import React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../store/interfaces';
import { thumbnailStyles } from '../../helpers/styles';

const RecipeCard = ({
  id,
  title,
  mainPhoto,
}: {
  id: IRecipe['id'];
  title: IRecipe['title'];
  mainPhoto: IRecipe['mainPhoto'];
}) => {
  return (
    <div className='col'>
      <div className='card recipe-card'>
        <Link to={`/${id}`} className='btn btn-outline-info fw-bold'>
          <div>
            <div style={{ ...thumbnailStyles, backgroundImage: `url(${mainPhoto.url})` }}></div>
          </div>
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
