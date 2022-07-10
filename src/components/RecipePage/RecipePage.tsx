import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from './Recipe';
import ErrorPage from '../ErrorPages/ErrorPage';
import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesError, getRecipesLoadingStatus } from '../../store/recipes/selectors';
import { IRecipeRouterComponentProps } from '../../store/interfaces';

const RecipePage = ({ match }: IRecipeRouterComponentProps) => {
  const paramsId: number = parseInt(match.params.idParam);

  const recipe = useSelector(getAllRecipes).find((recipe) => recipe.id === paramsId);
  const isLoading = useSelector(getRecipesLoadingStatus);
  const error = useSelector(getRecipesError);

  const dispatch = useDispatch();
  const getSelectedRecipe = (paramsId: number) => dispatch(fetchRecipe(paramsId));

  useEffect((): (() => void) => {
    if (!recipe) {
      getSelectedRecipe(paramsId);
    }
    return () => dispatch(resetStore());
  }, []);

  return (
    <div>
      {error && !recipe && <ErrorPage />}
      <div className='content max-width mx-auto pt-5'>
        {isLoading && !error && <p>Ładuję przepis...</p>}
        {recipe && (
          <article>
            {' '}
            <Recipe key={recipe.id} {...recipe} />
            <div className='text-center'>
              {/* EditMode: */}
              <Link to={`/${match.params.idParam}/edit`} className='btn btn-primary mb-5' role='button'>
                Edytuj
              </Link>
              <Link to='/przepisy' className='btn btn-primary ms-3 mb-5' role='button'>
                Powrót
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
