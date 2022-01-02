import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from './Recipe';

import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes } from '../../store/recipes/selectors';
import { IRecipeRouterComponentProps } from '../../store/interfaces';

const RecipePage = ({ match }: IRecipeRouterComponentProps) => {
  const paramsId: number = parseInt(match.params.idParam);
  const recipe = useSelector(getAllRecipes).find((recipe) => recipe.id === paramsId);

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
      <article>{recipe ? <Recipe key={recipe.id} {...recipe} /> : <p>Brak danych</p>}</article>
      <div className='text-center'>
        <Link to='/' className='btn btn-primary btn-sm' role='button'>
          Powrót
        </Link>
        {/* EditMode: */}
        <Link to={`/${match.params.idParam}/edit`} className='btn btn-primary btn-sm ms-2' role='button'>
          Edytuj
        </Link>
      </div>
    </div>
  );
};

export default RecipePage;
