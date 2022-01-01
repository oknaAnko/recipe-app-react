import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import { EDIT_ICON, TRASH_ICON } from '../../helpers/icons';

const Ingredient = ({ recipeId, ingredientId, amount, unit, name, isEditMode, deleteCurrentIngredient }) => {
  const [isIngredientInEdition, setIsIngredientInEdition] = useState(false);

  const handleIsIngredientInEditionClick = () => setIsIngredientInEdition(true);
  const closeIngredientEdition = () => setIsIngredientInEdition(false);

  const ingredientText = `${amount} ${unit} ${name}`;

  return (
    <li className='lh-lg'>
      {isIngredientInEdition ? (
        <IngredientForm
          recipeId={recipeId}
          ingredientId={ingredientId}
          amount={amount}
          name={name}
          unit={unit}
          isIngredientInEdition={isIngredientInEdition} //true
          closeIngredientEdition={closeIngredientEdition}
        />
      ) : (
        <div>
          <div className='col'>{ingredientText}</div>
          {isEditMode && (
            <div className='col-4'>
              <button
                type='button'
                className='btn btn-outline-primary btn-sm btn-icon'
                onClick={handleIsIngredientInEditionClick}>
                {EDIT_ICON}
              </button>
              <button
                type='button'
                className='btn btn-outline-primary btn-sm btn-icon'
                onClick={() => deleteCurrentIngredient(ingredientId)}>
                {TRASH_ICON}
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

Ingredient.defaultProps = {
  amount: '',
  unit: '',
  name: '',
  isEditMode: false,
};

export default Ingredient;
