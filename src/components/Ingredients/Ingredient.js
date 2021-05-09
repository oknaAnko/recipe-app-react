import React from 'react';

import IngredientForm from './IngredientForm';


const Ingredient = ({ recipeId, ingredientId, amount, unit, name, isEditMode }) => {

    const ingredientText = `${amount} ${unit} ${name}`;


    return (

        <li className="lh-lg">
            {isEditMode ?
                <IngredientForm recipeId={recipeId} ingredientId={ingredientId} amount={amount} name={name} unit={unit} />
                : <div className="col">{ingredientText}</div>
            }
        </li>
    );
}

Ingredient.defaultProps = {
    amount: "",
    unit: "",
    name: "",
    isEditMode: false,
};

export default Ingredient;