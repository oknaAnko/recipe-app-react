import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';
import ErrorPage from '../ErrorPages/ErrorPage';
import { fetchAllRecipes } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesLoadingStatus, getRecipesError } from '../../store/recipes/selectors';

const RecipeListPage = () => {
  const recipes = useSelector(getAllRecipes);
  const isLoading = useSelector(getRecipesLoadingStatus);
  const error = useSelector(getRecipesError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const recipesCards = recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />);

  return (
    <div>
      <div className='content max-width mx-auto pt-5'>
        <section className='container'>
          {isLoading && !error && <p>Ładuję przepisy...</p>}
          {recipes && (
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4'>{recipesCards}</div>
          )}
          {!isLoading && !recipes.length && <p className='h2 text-center'>Nie znaleziono przepisów</p>}
          {error && !recipes && <ErrorPage />}
        </section>
      </div>
    </div>
  );
};

export default RecipeListPage;
