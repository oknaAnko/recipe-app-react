import React, { useEffect } from 'react';
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

  return <article>{recipe}</article>;
};

export default RecipePage;
