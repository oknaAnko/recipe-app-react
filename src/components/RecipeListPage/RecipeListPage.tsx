import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

import { fetchAllRecipes } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesLoadingStatus } from '../../store/recipes/selectors';

const RecipeListPage = () => {
  const recipes = useSelector(getAllRecipes);
  const isLoading = useSelector(getRecipesLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const recipesCards = recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />);

  return (
    <div>
      <div className='content max-width mx-auto pt-5'>
        <section className='container'>
          {isLoading && <p>Ładuję przepisy...</p>}
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4'>{recipesCards}</div>
        </section>
      </div>
    </div>
  );
};

export default RecipeListPage;
