import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RecipeForm from '../Form/RecipeForm';
import ErrorPage from '../ErrorPages/ErrorPage';
import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesError, getRecipesLoadingStatus } from '../../store/recipes/selectors';
import { IRecipeRouterComponentProps } from '../../store/interfaces';

const EditRecipePage = ({ match }: IRecipeRouterComponentProps) => {
  const isEditMode = true;
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
            <div className='bg-light shadow text-center edit-container'>
              <RecipeForm
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                preparation={recipe.preparation}
                tips={recipe.tips}
                ingredients={recipe.ingredients}
                tags={recipe.tags}
                mainPhoto={recipe.mainPhoto}
              />
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default EditRecipePage;
