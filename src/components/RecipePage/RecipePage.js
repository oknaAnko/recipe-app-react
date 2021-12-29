import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from './Recipe';

import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes } from '../../store/recipes/selectors';

const RecipePage = ({ match }) => {
  const recipes = useSelector(getAllRecipes);
  let recipe;

  const dispatch = useDispatch();

  const allRecipesFetched = Array.isArray(recipes) && Boolean(recipes.length);

  useEffect(() => {
    if (!allRecipesFetched) {
      dispatch(fetchRecipe(match.params.id));
    }
    return () => dispatch(resetStore());
  }, []);

  if (allRecipesFetched) {
    const foundRecipe = recipes.find((recipe) => recipe.id === match.params.id);
    console.log(foundRecipe);
    recipe = [foundRecipe].map((recipe) => <Recipe key={recipe.id} {...recipe} />);
  } else {
    recipe = [recipes].map((recipe) => <Recipe key={recipe.id} {...recipe} />);
  }

  return (
    <div>
      <article>{recipe}</article>
      <div className='text-center'>
        <Link to='/' className='btn btn-primary btn-sm' role='button'>
          Powrót
        </Link>
        {/* EditMode: */}
        <Link to={`/${match.params.id}/edit`} className='btn btn-primary btn-sm ms-2' role='button'>
          Edytuj
        </Link>
      </div>
    </div>
  );
};

export default RecipePage;
