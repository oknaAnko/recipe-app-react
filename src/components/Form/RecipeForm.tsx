import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Ingredients from '../Ingredients/Ingredients';
import { editRecipe } from '../../store/recipes/actions';
import { IRecipe } from '../../store/interfaces';

const RecipeForm = ({ id, title, preparation, tips, ingredients }: IRecipe) => {
  const isEditMode = true;
  const [titleInput, setTitleInput] = useState(title);
  const [preparationInput, setPreparationInput] = useState(preparation);
  const [tipsInput, setTipsInput] = useState(tips);

  const dispatch = useDispatch();
  const componentMounted = useRef(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);
  const handlePreparationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPreparationInput(e.target.value);
  const handleTipsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTipsInput(e.target.value);

  const updateRecipe = (id: number | string, changedRecipe: IRecipe) => dispatch(editRecipe({ id, changedRecipe }));

  let ingredientsToUpdate = ingredients;

  const handleFormSubmit = (id: number | string) => async () => {
    // e.preventDefault();

    componentMounted.current = true;

    if (titleInput.length || !titleInput.includes('?')) {
      if (componentMounted.current) {
        updateRecipe(id, {
          id,
          title: titleInput,
          ingredients: ingredientsToUpdate,
          tags: [],
          preparation: preparationInput,
          tips: tipsInput,
        });
      }
    } else alert('pole nie może być puste');

    return () => {
      componentMounted.current = false;
    };
  };

  return (
    <section>
      <p className='edit-title'>Edycja przepisu:</p>
      <p className='edit-title'>{titleInput}</p>
      <form onSubmit={handleFormSubmit(id)}>
        <div className='col mt-4'>
          <input
            type='text'
            className='form-control my-5 w-75 mx-auto'
            placeholder='Wpisz tytuł'
            value={titleInput}
            onChange={handleTitleChange}
          />
          <Ingredients recipeId={id} ingredients={ingredients} isEditMode={isEditMode} />
          <h4 className='mb-3'>Przygotowanie</h4>
          <textarea
            className='form-control mb-5'
            rows={10}
            placeholder='Wpisz opis'
            value={preparationInput}
            onChange={handlePreparationChange}
          />
          <h4 className='mb-3'>Porada</h4>
          <textarea
            className='form-control mb-5'
            rows={5}
            placeholder='Wpisz poradę'
            value={tipsInput}
            onChange={handleTipsChange}
          />
          <button className='btn btn-primary btn-sm'>Dodaj opisy</button>
        </div>
      </form>
    </section>
  );
};

RecipeForm.defaultProps = {
  id: '',
  title: '',
};

export default RecipeForm;
