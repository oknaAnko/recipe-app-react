import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addRecipe } from '../../store/recipes/actions';
import { IRecipe } from '../../store/interfaces';

const CreateRecipePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [titleInput, setTitleInput] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);

  const createRecipe = (recipe: IRecipe) => dispatch(addRecipe(recipe));

  const handleCreateRecipeSubmit = async () => {
    // e.preventDefault();

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
    } else alert('pole nie może być puste');

    const location = {
      pathname: `/${id}/edit`,
    };

    history.push(location);
  };

  return (
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
  );
};

CreateRecipePage.defaultProps = {
  title: '',
};

export default CreateRecipePage;
