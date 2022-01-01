import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';
import { deleteIngredient } from '../../store/recipes/actions';

const Ingredients = ({ recipeId, ingredients, isEditMode }) => {
  const [isNewIngredientAdded, setIsNewIngredientAdded] = useState(false);
  const dispatch = useDispatch();
  const removeIngredient = (recipeId, ingredientId) => dispatch(deleteIngredient({ recipeId, ingredientId }));

  const handleAddNewIngredientClick = () => setIsNewIngredientAdded(true);
  const handleDeleteNewIngredientClick = () => setIsNewIngredientAdded(false);

  const deleteCurrentIngredient = (ingredientId) => {
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

  return (
    <div className='col mt-4'>
      {isEditMode && <h4 className='mb-3'>Składniki</h4>}

      {Boolean(ingredients.length) ? <ul>{ingredientsList}</ul> : null}

      {isEditMode && (
        <button type='button' className='btn btn-primary btn-sm mb-2' onClick={handleAddNewIngredientClick}>
          Dodaj składnik
        </button>
      )}

      {isNewIngredientAdded && (
        <IngredientForm
          recipeId={recipeId}
          deleteNewIngredient={handleDeleteNewIngredientClick}
          deleteCurrentIngredient={deleteCurrentIngredient}
          isNewIngredientAdded={isNewIngredientAdded}
          isIngredientInEdition={false}
        />
      )}
    </div>
  );
};

Ingredients.defaultProps = {
  ingredients: [],
  isEditMode: false,
};

export default Ingredients;
