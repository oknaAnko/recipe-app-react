import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';
import { deleteIngredient } from '../../store/recipes/actions';
import { IIngredient } from '../../store/interfaces';

const Ingredients = ({
  recipeId,
  ingredients,
  isEditMode,
}: {
  recipeId: number | string;
  ingredients: IIngredient[];
  isEditMode: boolean;
}) => {
  const [isNewIngredientAdded, setIsNewIngredientAdded] = useState(false);

  const dispatch = useDispatch();
  const removeIngredient = (recipeId: number | string, ingredientId: number | string) =>
    dispatch(deleteIngredient({ recipeId, ingredientId }));

  const handleAddNewIngredientClick = () => setIsNewIngredientAdded(true);
  const handleDeleteNewIngredientClick = () => setIsNewIngredientAdded(false);

  const deleteCurrentIngredient = (ingredientId: number | string) => {
    removeIngredient(recipeId, ingredientId);
  };

  const ingredientsList = ingredients.map((ingredient) => (
    <Ingredient
      key={ingredient.id}
      recipeId={recipeId}
      ingredientId={ingredient.id}
      {...ingredient}
      isEditMode={isEditMode}
      deleteCurrentIngredient={deleteCurrentIngredient}
    />
  ));

  const createIngredientForm = () => (
    <div className='list-group list-group-flush'>
      <div className='list-group-item w-75 mx-auto '>
        <IngredientForm
          recipeId={recipeId}
          ingredientId={uuidv4()}
          amount={0}
          name={`""`}
          unit={`""`}
          isNewIngredientAdded={isNewIngredientAdded}
          deleteCurrentIngredient={deleteCurrentIngredient}
          deleteNewIngredient={handleDeleteNewIngredientClick}
        />
      </div>
    </div>
  );

  return (
    <div className='mb-5'>
      {isEditMode && <h4 className='mb-3'>Składniki</h4>}

      {Boolean(ingredients.length) ? (
        <ul className='list-group list-group-flush w-75 mx-auto'>{ingredientsList}</ul>
      ) : null}

      {isEditMode && (
        <button
          type='button'
          data-testid='add-ingredient-btn'
          className='btn btn-primary btn-sm mb-2'
          onClick={handleAddNewIngredientClick}>
          Dodaj składnik
        </button>
      )}

      {isNewIngredientAdded && createIngredientForm()}
    </div>
  );
};

Ingredients.defaultProps = {
  ingredients: [],
  isEditMode: false,
};

export default Ingredients;
