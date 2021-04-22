import React, { useState } from 'react';

import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


const Ingredients = ({ ingredients, isEditMode }) => {
    const [isNewIngredientAdded, setisNewIngredientAdded] = useState(false);

    const handleAddNewIngredientClick = () => setisNewIngredientAdded(true);

    const handleDeleteIngredientClick = (e) => {
        e.preventDefault();
        setisNewIngredientAdded(false)
    };

    const ingredientsList = ingredients.map(ingredient =>
        <Ingredient key={ingredient.id} {...ingredient} deleteIngredient={handleDeleteIngredientClick} isEditMode={isEditMode} />);


    return (
        <div className="col">
            {isEditMode && <h4 className="mb-3">Składniki</h4>}

            {Boolean(ingredients.length) ?
                <ul>
                    {ingredientsList}
                </ul>
                : null}

            {isEditMode && <button className="btn btn-primary btn-sm" onClick={handleAddNewIngredientClick}>Dodaj składnik</button>}

            {isNewIngredientAdded && <IngredientForm deleteIngredient={handleDeleteIngredientClick} isNewIngredientAdded={isNewIngredientAdded} />}
        </div>
    )
};

Ingredients.defaultProps = {
    ingredients: [],
    isEditMode: false,
};

export default Ingredients;