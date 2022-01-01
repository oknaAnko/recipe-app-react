import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Tags from '../Tags/Tags';
import TitleForm from '../Form/TitleForm';
import { fetchRecipe, resetStore } from '../../store/recipes/actions';
import { getAllRecipes } from '../../store/recipes/selectors';

const EditRecipePage = ({ match }) => {
  const isEditMode = true;
  const recipes = useSelector(getAllRecipes);
  const dispatch = useDispatch();

  const allRecipesFetched = Array.isArray(recipes) && Boolean(recipes.length);
  useEffect(() => {
    if (!allRecipesFetched) {
      dispatch(fetchRecipe(match.params.id));
    }
    return () => dispatch(resetStore());
  }, []);

  const title = recipes.map((recipe) => (
    <TitleForm
      key={recipe.id}
      id={recipe.id}
      title={recipe.title}
      preparation={recipe.preparation}
      tips={recipe.tips}
      ingredients={recipe.ingredients}
    />
  ));

  const tags = recipes.map((recipe) => (
    <Tags key={recipe.id} id={recipe.id} tags={recipe.tags} isEditMode={isEditMode} />
  ));

  return (
    <article>
      <div className='bg-light shadow text-center edit-container'>{title}</div>
      <div className='bg-light shadow edit-container'>
        <section className='row my-5'>{Boolean(recipes.length) ? tags : <Tags isEditMode={isEditMode} />}</section>
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
