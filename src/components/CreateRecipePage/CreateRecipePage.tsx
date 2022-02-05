import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ErrorPage from '../ErrorPages/ErrorPage';
import { addRecipe } from '../../store/recipes/actions';
import { getAllRecipes, getRecipesError } from '../../store/recipes/selectors';
import { IRecipe } from '../../store/interfaces';

const CreateRecipePage = () => {
  const recipe = useSelector(getAllRecipes);
  const error = useSelector(getRecipesError);

  const dispatch = useDispatch();
  const history = useHistory();

  const [titleInput, setTitleInput] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);

  const createRecipe = (recipe: IRecipe) => dispatch(addRecipe(recipe));

  const handleCreateRecipeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id: string = uuidv4();

    if (titleInput.length) {
      createRecipe({
        id,
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
      console.log('post');
      console.log(id);
      console.log(addRecipe);
    } else alert('pole nie może być puste');

    if (recipe) {
      const location = {
        pathname: `/${id}/edit`,
      };

      history.push(location);
    }
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
