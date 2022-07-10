import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorPage from '../ErrorPages/ErrorPage';
import { addRecipe } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesError } from '../../store/recipes/selectors';
import { IRecipe } from '../../store/interfaces';

const CreateRecipePage = () => {
  const recipe = useSelector(getAllRecipes);
  const error = useSelector(getRecipesError);

  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);

  const createRecipe = (recipe: IRecipe) => dispatch(addRecipe(recipe));

  const handleCreateRecipeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInput.length) {
      createRecipe({
        id: '',
        title: titleInput,
        ingredients: [],
        tags: [],
        preparation: '',
        tips: '',
        mainPhoto: {
          id: 0,
          url: '',
          alt: '',
        },
      });
    } else alert('pole nie może być puste');
  };

  return (
    <div>
      <div className='content max-width mx-auto pt-5'>
        <div className='bg-light text-center shadow edit-container'>
          <section>
            <p className='edit-title'>Utwórz przepis</p>
            <form onSubmit={handleCreateRecipeSubmit}>
              <input
                type='text'
                className='form-control mb-5 w-75 mx-auto'
                placeholder='Wpisz tytuł'
                value={titleInput}
                onChange={handleTitleChange}
              />
              <button className='btn btn-success' type='submit'>
                Utwórz
              </button>
            </form>
          </section>
        </div>
      </div>
      {error && !recipe && <ErrorPage />}
    </div>
  );
};

CreateRecipePage.defaultProps = {
  title: '',
};

export default CreateRecipePage;
