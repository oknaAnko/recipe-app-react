import React, { useState } from 'react';

import IngredientForm from './IngredientForm';

import { CONFIRM_ICON, EDIT_ICON, TRASH_ICON } from '../../helpers/icons';


const Ingredient = ({ amount, deleteIngredient, id, isEditMode, name, unit }) => {

    const [isEdited, setIsEdited] = useState(false);

    const handleToggleIngredientClick = (idClicked) => {
        if (id === idClicked)
            setIsEdited(!isEdited);
    };

    const toggleBtnLabel = isEdited ? CONFIRM_ICON : EDIT_ICON;

    const editIngredientButtons = isEditMode &&
        <div className="d-inline-block">
            <button className="btn btn-outline-primary btn-sm"
                onClick={() => handleToggleIngredientClick(id)}>{toggleBtnLabel}</button>
            <button className="btn btn-outline-primary btn-sm" onClick={deleteIngredient}>{TRASH_ICON}</button>
        </div>;

    const ingredientText = `${amount} ${unit} ${name}`;

    const ingredient = isEdited ?
        <IngredientForm amount={amount} name={name} unit={unit} isEdited={isEdited} setIsEdited={setIsEdited} />
        : ingredientText;

    return (
        <li>
            {ingredient} {editIngredientButtons}
        </li>
    );
}

export default Ingredient;