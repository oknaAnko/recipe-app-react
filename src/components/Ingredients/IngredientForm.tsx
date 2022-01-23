import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CONFIRM_ICON, TRASH_ICON } from '../../helpers/icons';
import { editIngredient, addIngredient } from '../../store/recipes/actions';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../store/interfaces';

const IngredientForm = ({
  recipeId,
  ingredientId,
  amount,
  name,
  unit,
  isIngredientInEdition, //false=empty; true=filled
  isNewIngredientAdded,
  closeIngredientEdition,
  deleteCurrentIngredient,
  deleteNewIngredient,
}: {
  recipeId: number | string;
  ingredientId: number | string;
  amount: number;
  name: string;
  unit: string;
  isIngredientInEdition?: boolean; //false=empty; true=filled
  isNewIngredientAdded: boolean;
  closeIngredientEdition?: () => void;
  deleteCurrentIngredient: (ingredientId: number | string) => void;
  deleteNewIngredient: () => void;
}) => {
  const [amountInput, setAmountInput] = useState<number>(amount);
  const [unitInput, setUnitInput] = useState<string>(unit);
  const [nameInput, setNameInput] = useState<string>(name);

  const dispatch = useDispatch();

  const updateIngredient = (recipeId: number | string, ingredientId: number | string, changedIngredient: IIngredient) =>
    dispatch(editIngredient({ recipeId, ingredientId, changedIngredient }));
  const createIngredient = (recipeId: number | string, newIngredient: IIngredient) =>
    dispatch(addIngredient({ recipeId, newIngredient }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setAmountInput(parseInt(e.target.value));
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUnitInput(e.target.value);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value);

  const handleIngredientClick = () => {
    if (isIngredientInEdition && closeIngredientEdition) {
      updateIngredient(recipeId, ingredientId, {
        id: ingredientId,
        amount: amountInput,
        unit: unitInput,
        name: nameInput,
      });
      closeIngredientEdition();
    } else {
      const idCreated: string = uuidv4();
      createIngredient(recipeId, {
        id: idCreated,
        amount: amountInput,
        unit: unitInput,
        name: nameInput,
      });
    }
  };

  return (
    <div className='input-group py-2'>
      <div className='row'>
        <div className='col-6 pe-2'>
          <input
            type='text'
            className='form-control w-20'
            placeholder='Wpisz ilość'
            onChange={handleAmountChange}
            value={amountInput}
          />
        </div>
        <div className='col-6'>
          <select className='form-select' name='unit' id='unit' onChange={handleUnitChange} value={unitInput}>
            <option value='sztuk'>szt.</option>
            <option value='opakowań'>op.</option>
            <option value='litr'>l</option>
            <option value='mililitr'>ml</option>
            <option value='gram'>gr</option>
            <option value='łyżka'>łyżka</option>
            <option value='łyżeczka'>łyżeczka</option>
            <option value='empty'>-</option>
          </select>
        </div>
        <div className='col-12 py-2'>
          <input
            type='text'
            className='form-control'
            placeholder='Wpisz składnik'
            onChange={handleNameChange}
            value={nameInput}
          />
        </div>
      </div>

      <div className='col-4'>
        <button type='button' className='btn btn-outline-primary btn-sm btn-icon' onClick={handleIngredientClick}>
          {CONFIRM_ICON}
        </button>
        <button
          type='button'
          className='btn btn-outline-primary btn-sm btn-icon'
          onClick={isNewIngredientAdded ? deleteNewIngredient : () => deleteCurrentIngredient(ingredientId)}>
          {TRASH_ICON}
        </button>
      </div>
    </div>
  );
};

IngredientForm.defaultProps = {
  isEdited: false,
  amount: 0,
  unit: '',
  name: '',
  deleteNewIngredient: () => {},
  isNewIngredientAdded: false,
};

export default IngredientForm;
