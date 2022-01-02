import React from 'react';

import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';

import { MESSAGES } from '../../helpers/constants';
import { IRecipe } from '../../store/interfaces';

const Recipe = ({ id, title, preparation, ingredients, tips, tags }: IRecipe) => {
  const tipText = Boolean(tips.length) ? tips : MESSAGES.no_tips;

  return (
    <div className='bg-light shadow edit-container'>
      <section className='border border-dark border-2 rounded-3 recipe-title'>
        <h3>{title}</h3>
      </section>
      <section className='row row-cols-1 row-cols-md-2'>
        <div className='col mt-4'>
          <h4 className='mb-3 p-2 rounded-3'>Składniki</h4>
          <Ingredients recipeId={id} ingredients={ingredients} isEditMode={false} />
        </div>
        <div className='col mt-4'>
          <h4 className='mb-3 rounded-3'>Przygotowanie</h4>
          <p className='card-text lh-lg'>{preparation}</p>
          <div className='d-inline-block w-75 border-tips border-3 rounded-3 p-3 mt-3'>
            <p className='tips-title'>Porady</p>
            <p className='card-text'>{tipText}</p>
          </div>
        </div>
      </section>
      <section className='row my-5'>
        <Tags recipeId={id} tags={tags} isEditMode={false} />
      </section>
    </div>
  );
};

Recipe.defaultProps = {
  title: '',
  preparation: '',
  ingredients: [],
  tips: '',
  tags: [],
};

export default Recipe;
