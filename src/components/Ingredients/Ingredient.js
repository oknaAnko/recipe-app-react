import React, { useState } from 'react';

import IngredientForm from './IngredientForm';

import { CONFIRM_ICON, EDIT_ICON, TRASH_ICON } from '../../helpers/icons';


const Ingredient = ({ amount, deleteIngredient, id, isEditMode, name, unit }) => {

    const [isEdited, setIsEdited] = useState(false);

    const handleToggleIngredientClick = (idClicked) => {
        if (id === idClicked)
            setIsEdited(!isEdited); // prev
    };

    const toggleBtnLabel = isEdited ? CONFIRM_ICON : EDIT_ICON;

    const ingredientText = `${amount} ${unit} ${name}`;

    const ingredient = isEdited ?
        <IngredientForm amount={amount} name={name} unit={unit} isEdited={isEdited} setIsEdited={setIsEdited} />
        : ingredientText;

    return (

        <li className="lh-lg">
            {isEditMode ?
                <div className="row">
                    <div className="col-8">{ingredient}</div>
                    <div className="col-4">
                        <div className="d-inline-block">
                            <button className="btn btn-outline-primary btn-sm"
                                onClick={() => handleToggleIngredientClick(id)}>{toggleBtnLabel}</button>
                            <button className="btn btn-outline-primary btn-sm" onClick={deleteIngredient}>{TRASH_ICON}</button>
                        </div>
                    </div>
                </div>
                : <div className="row">
                    <div className="col">{ingredient}</div>
                </div>
            }
        </li>
    );
}

export default Ingredient;