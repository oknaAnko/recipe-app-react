import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

import { fetchAllRecipes } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesLoadingStatus } from '../../store/recipes/selectors';
import { RecipeListPageMatchParams } from '../../store/interfaces';

const RecipeListPage = ({ match }: RouteComponentProps<RecipeListPageMatchParams>) => {
  const recipes = useSelector(getAllRecipes);
  const isLoading = useSelector(getRecipesLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  let selectedRecipeIndex: number[] = [];

  recipes.forEach((recipe, index) => {
    const selectedTags = recipe.tags.filter((tag) => tag.name === match.params.name);

    if (Boolean(selectedTags.length)) selectedRecipeIndex.push(index);
  });

  const selectedRecipesCards = recipes
    .filter((recipe) => {
      for (const i of selectedRecipeIndex) {
        if (i === Number(recipe.id)) return true;
      }
      return false;
    })
    .map((recipe) => <RecipeCard key={recipe.id} {...recipe} />);

  return (
    <div>
      <div className='content max-width mx-auto pt-5'>
        <section className='container'>
          {isLoading && <p>Ładuję przepisy...</p>}
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4'>{selectedRecipesCards}</div>
        </section>
      </div>
    </div>
  );
};

export default RecipeListPage;
