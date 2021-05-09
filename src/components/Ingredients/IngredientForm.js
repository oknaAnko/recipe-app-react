import React, { useContext, useState } from 'react';

import { CONFIRM_ICON, EDIT_ICON, TRASH_ICON } from '../../helpers/icons';
import request from '../../helpers/request';

import { StoreContext } from '../../store/StoreProvider';


const IngredientForm = ({ recipeId, ingredientId, amount, name, unit, deleteNewIngredient, isNewIngredientAdded, confirmNewIngredient }) => {

    const [isEdited, setIsEdited] = useState(false);

    const [amountInput, setAmountInput] = useState(amount);
    const [unitInput, setUnitInput] = useState(unit);
    const [nameInput, setNameInput] = useState(name);

    const { recipes, setRecipes } = useContext(StoreContext);

    const handleAmountChange = e => setAmountInput(e.target.value);
    const handleUnitChange = e => setUnitInput(e.target.value);
    const handleNameChange = e => setNameInput(e.target.value);

    const handleIngredientFormSubmit = idClicked => async e => {
        e.preventDefault();

        if (idClicked === ingredientId) {
            setIsEdited(prev => !prev);
        };

        const newIngredient = {
            amount: amountInput,
            unit: unitInput,
            name: nameInput,
        };

        const changedIngredient = {
            ingredientId,
            amount: amountInput,
            unit: unitInput,
            name: nameInput,
        };

        if (isEdited && !isNewIngredientAdded) {
            const { data } = await request.put(`/recipes/${recipeId}/ingredients/${ingredientId}`, changedIngredient)
            console.log('put');
            console.log(data);
        };

        if (isEdited && isNewIngredientAdded) {
            const { data } = await request.post(`/recipes/${recipeId}/ingredients/`, newIngredient)
            console.log('post');
            console.log(data);
        };

        confirmNewIngredient();
    };

    const deleteCurrentIngredient = async () => {
        await request.delete(`/recipes/${recipeId}/ingredients/${ingredientId}`)
        setRecipes(recipes.map(recipe => recipe.id === recipeId ?
            recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)
            : recipe));
    }

    const toggleBtnLabel = isEdited || isNewIngredientAdded ? CONFIRM_ICON : EDIT_ICON;


    return (
        <form onSubmit={handleIngredientFormSubmit(ingredientId)}>
            <div className="input-group">
                {isEdited || isNewIngredientAdded ?
                    <div className="row">
                        <div className="col-6 pe-2">
                            <input type="text" className="form-control w-20" placeholder="Wpisz ilość" onChange={handleAmountChange} value={amountInput} />
                        </div>
                        <div className="col-6">
                            <select className="form-select" name="unit" id="unit" onChange={handleUnitChange} value={unitInput}>
                                <option value="sztuk">szt.</option>
                                <option value="opakowań">op.</option>
                                <option value="litr">l</option>
                                <option value="mililitr">ml</option>
                                <option value="gram">gr</option>
                                <option value="łyżka">łyżka</option>
                                <option value="łyżeczka">łyżeczka</option>
                                <option value="empty">-</option>
                            </select>
                        </div>
                        <div className="col-12 py-2">
                            <input type="text" className="form-control" placeholder="Wpisz składnik" onChange={handleNameChange} value={nameInput} />
                        </div>
                    </div>
                    :
                    <p className="col-8">{`${amount} ${unit} ${name}`}</p>
                }
                <div className="col-4">
                    <button type="submit" className="btn btn-outline-primary btn-sm">{toggleBtnLabel}</button>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={isNewIngredientAdded ? deleteNewIngredient : deleteCurrentIngredient}>{TRASH_ICON}</button>
                </div>
            </div>
        </form>
    );
}

IngredientForm.defaultProps = {
    isEdited: false,
    amount: "",
    unit: "",
    name: "",
    deleteNewIngredient: () => { },
    isNewIngredientAdded: false,
    confirmNewIngredient: () => { },
};

export default IngredientForm;