import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ingredients from '../Ingredients/Ingredients';
import { editRecipe } from '../../store/recipes/actions';
import { IRecipe } from '../../store/interfaces';
import Images from '../Images/Images';
import { getMainImage, getSecondaryImage, getThumbnailImage } from '../../store/images/selectors';

const RecipeForm = ({
  id,
  title,
  preparation,
  tips,
  ingredients,
  mainPhoto,
  secondaryPhoto,
  thumbnail,
  mainPhotoId,
  secondaryPhotoId,
  thumbnailId,
}: IRecipe) => {
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

  let mainPhotoToUpdate = mainPhoto;
  let secondaryPhotoToUpdate = secondaryPhoto;
  let thumbnailToUpdate = thumbnail;
  const uploadedMainPhoto = useSelector(getMainImage);
  const uploadedSecondaryPhoto = useSelector(getSecondaryImage);
  const uploadedThumbnail = useSelector(getThumbnailImage);

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
          mainPhoto,
          secondaryPhoto,
          thumbnail,
          mainPhotoId: uploadedMainPhoto ? uploadedMainPhoto.id : mainPhotoToUpdate.id,
          secondaryPhotoId: uploadedSecondaryPhoto ? uploadedSecondaryPhoto.id : secondaryPhotoToUpdate.id,
          thumbnailId: uploadedThumbnail ? uploadedThumbnail.id : thumbnailToUpdate.id,
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
        <Images
          recipeId={id}
          mainPhoto={mainPhoto}
          secondaryPhoto={secondaryPhoto}
          thumbnail={thumbnail}
          uploadedMainPhoto={uploadedMainPhoto}
          uploadedSecondaryPhoto={uploadedSecondaryPhoto}
          uploadedThumbnail={uploadedThumbnail}
        />
      </form>
    </section>
  );
};

RecipeForm.defaultProps = {
  id: '',
  title: '',
};

export default RecipeForm;
