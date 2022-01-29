import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Ingredients from '../Ingredients/Ingredients';
import { editRecipe } from '../../store/recipes/actions';
import { IRecipe, IImage } from '../../store/interfaces';
import Images from '../Images/Images';
import { CONFIRM_ICON, TRASH_ICON } from '../../helpers/icons';

const RecipeForm = ({ id, title, preparation, tips, ingredients, mainPhoto }: IRecipe) => {
  const isEditMode = true;
  const [titleInput, setTitleInput] = useState(title);
  const [preparationInput, setPreparationInput] = useState(preparation);
  const [tipsInput, setTipsInput] = useState(tips);
  const [uploadedPhoto, setUploadedPhoto] = useState<IImage>(mainPhoto);

  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);
  const handlePreparationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPreparationInput(e.target.value);
  const handleTipsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTipsInput(e.target.value);

  const updateRecipe = (id: IRecipe['id'], changedRecipe: IRecipe) => dispatch(editRecipe({ id, changedRecipe }));

  let ingredientsToUpdate = ingredients;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInput.length || !titleInput.includes('?')) {
      updateRecipe(id, {
        id,
        title: titleInput,
        ingredients: ingredientsToUpdate,
        tags: [],
        preparation: preparationInput,
        tips: tipsInput,
        mainPhoto: uploadedPhoto,
      });

      console.log('update');
      console.log(editRecipe);
    } else alert('pole nie może być puste');
  };

  return (
    <section>
      <p className='edit-title'>Edycja przepisu:</p>
      <p className='edit-title'>{titleInput}</p>
      <form onSubmit={handleFormSubmit}>
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
        <h4 className='mb-3'>Zdjęcia</h4>
        <Images setUploadedPhoto={setUploadedPhoto} uploadedPhoto={uploadedPhoto} currentPhoto={mainPhoto} />
        <div className='text-center my-5'>
          <button type='submit' data-testid='confirm-btn' className='btn btn-success btn-icon'>
            Zatwierdź zmiany {CONFIRM_ICON}
          </button>
          <button
            type='button'
            data-testid='remove-btn'
            className='btn btn-danger btn-icon ms-4'
            // onClick={}
          >
            Usuń przepis {TRASH_ICON}
          </button>
          {/* <Link to='/preview' className='btn btn-success'>
                Podgląd
              </Link>
              <Link to='/admin' className='btn btn-danger ms-4'>
                Usuń przepis
              </Link> */}
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
