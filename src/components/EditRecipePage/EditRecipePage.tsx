import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Tags from '../Tags/Tags';
import RecipeForm from '../Form/RecipeForm';
import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes } from '../../store/recipes/selectors';
import { IRecipeRouterComponentProps } from '../../store/interfaces';

const EditRecipePage = ({ match }: IRecipeRouterComponentProps) => {
  const isEditMode = true;
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
    <article>
      <div className='bg-light shadow text-center edit-container'>
        {recipe ? (
          <RecipeForm
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            preparation={recipe.preparation}
            tips={recipe.tips}
            ingredients={recipe.ingredients}
            tags={recipe.tags}
            mainPhoto={recipe.mainPhoto}
            secondaryPhoto={recipe.secondaryPhoto}
            thumbnail={recipe.thumbnail}
            mainPhotoId={recipe.mainPhotoId}
            secondaryPhotoId={recipe.secondaryPhotoId}
            thumbnailId={recipe.thumbnailId}
          />
        ) : (
          <p>Brak danych</p>
        )}
      </div>
      <div className='bg-light shadow edit-container'>
        <section className='row my-5'>
          {recipe ? (
            <Tags key={recipe.id} recipeId={recipe.id} tags={recipe.tags} isEditMode={isEditMode} />
          ) : (
            <p> Brak danych</p>
          )}
        </section>
        <div className='text-center'>
          <Link to='/preview' className='btn btn-success'>
            Podgląd
          </Link>
          <Link to='/admin' className='btn btn-danger ms-4'>
            Usuń przepis
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EditRecipePage;
