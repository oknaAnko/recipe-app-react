import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import { EDIT_ICON, TRASH_ICON } from '../../helpers/icons';
import { IRecipe, IIngredient } from '../../store/interfaces';

const Ingredient = ({
  recipeId,
  ingredientId,
  amount,
  unit,
  name,
  isEditMode,
  deleteCurrentIngredient,
}: {
  recipeId: IRecipe['id'];
  ingredientId: IIngredient['id'];
  amount: number;
  name: string;
  unit: string;
  isEditMode: boolean;
  deleteCurrentIngredient: (ingredientId: IIngredient['id']) => void;
}) => {
  const [isIngredientInEdition, setIsIngredientInEdition] = useState(false);

  const handleIsIngredientInEditionClick = () => setIsIngredientInEdition(true);
  const closeIngredientEdition = () => setIsIngredientInEdition(false);

  const ingredientText = `${amount} ${unit} ${name}`;

  return (
    <li className='lh-lg list-group-item'>
      {isIngredientInEdition ? (
        <IngredientForm
          recipeId={recipeId}
          ingredientId={ingredientId}
          amount={amount}
          name={name}
          unit={unit}
          isIngredientInEdition={isIngredientInEdition} //true
          isNewIngredientAdded={false}
          closeIngredientEdition={closeIngredientEdition}
          deleteCurrentIngredient={deleteCurrentIngredient}
          deleteNewIngredient={() => {}}
        />
      ) : (
        <div className='input-group py-2'>
          <div className='col-8'>{ingredientText}</div>
          {isEditMode && (
            <div className='col-4'>
              <button
                type='button'
                data-testid={`edit-btn-${ingredientId}`}
                className='btn btn-outline-primary btn-lg btn-icon'
                onClick={handleIsIngredientInEditionClick}>
                {EDIT_ICON}
              </button>
              <button
                type='button'
                data-testid={`remove-btn-${ingredientId}`}
                className='btn btn-outline-primary btn-lg btn-icon'
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
