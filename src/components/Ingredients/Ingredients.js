import React, { useState } from 'react';

import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


const Ingredients = ({ id, ingredients, isEditMode }) => {

    const [isNewIngredientAdded, setIsNewIngredientAdded] = useState(false);

    const handleAddNewIngredientClick = () => setIsNewIngredientAdded(true);

    const confirmNewIngredient = () => setIsNewIngredientAdded(false);

    const handleDeleteNewIngredientClick = () => setIsNewIngredientAdded(false);

    const ingredientsList = ingredients.map(ingredient =>
        <Ingredient key={ingredient.id} recipeId={id} ingredientId={ingredient.id} {...ingredient} isEditMode={isEditMode} />);


    return (
        <div className="col mt-4">
            {isEditMode && <h4 className="mb-3">Składniki</h4>}

            {Boolean(ingredients.length) ?
                <ul>
                    {ingredientsList}
                </ul>
                : null}

            {isEditMode && <button className="btn btn-primary btn-sm mb-2" onClick={handleAddNewIngredientClick}>Dodaj składnik</button>}

            {isNewIngredientAdded && <IngredientForm recipeId={id} deleteNewIngredient={handleDeleteNewIngredientClick} isNewIngredientAdded={isNewIngredientAdded} confirmNewIngredient={confirmNewIngredient} />}
        </div>
    )
};

Ingredients.defaultProps = {
    ingredients: [],
    isEditMode: false,
};

export default Ingredients;