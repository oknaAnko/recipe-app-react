import React, { useState } from 'react';

import Ingredient from './Ingredient';
import IngredientForm from './IngredientForm';


const Ingredients = ({ ingredients, isEditMode }) => {
    const [isNewAdded, setIsNewAdded] = useState(false);

    console.log(isEditMode); //true

    const handleAddNewIngredientClick = () => setIsNewAdded(true);

    const handleDeleteIngredientClick = (e) => {
        e.preventDefault();
        setIsNewAdded(false)
    };

    const ingredientsList = ingredients.map(ingredient =>
        <Ingredient key={ingredient.id} {...ingredient} deleteIngredient={handleDeleteIngredientClick} isEditMode={isEditMode} isNewAdded={isNewAdded} />);

    const pageTitle = Boolean(ingredients.length) ? "Edycja przepisu:" : "Dodaj nowy przepis:";

    return (
        <div className="col">
            {isEditMode && <h3 className="mb-5 text-end">{pageTitle}</h3>}

            <h4 className="mb-3">Składniki</h4>

            {ingredients.length ?
                <ul>
                    {ingredientsList}
                </ul>
                : <button className="btn btn-primary btn-sm" onClick={handleAddNewIngredientClick}>Dodaj składnik</button>}

            {isEditMode && <button className="btn btn-primary btn-sm" onClick={handleAddNewIngredientClick}>Dodaj składnik</button>}

            {isNewAdded && <IngredientForm deleteIngredient={handleDeleteIngredientClick} isNewAdded={isNewAdded} />}
        </div>
    )
};

Ingredients.defaultProps = {
    ingredients: [],
};

export default Ingredients;