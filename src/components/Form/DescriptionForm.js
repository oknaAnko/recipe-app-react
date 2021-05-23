import React, { useContext, useState } from 'react';

import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';


const DescriptionForm = ({ id, preparation, tips }) => {

    const [preparationInput, setPreparationInput] = useState(preparation);
    const [tipsInput, setTipsInput] = useState(tips);

    const { recipes, setRecipes } = useContext(StoreContext);

    const handlePreparationChange = e => setPreparationInput(e.target.value);
    const handleTipsChange = e => setTipsInput(e.target.value);

    const handleDescriptionFormSubmit = id => async e => {
        e.preventDefault()

        const changedDescriptionRecipe = {
            id,
            preparation: preparationInput,
            tips: tipsInput,
        }

        if (preparationInput.length) {
            const { data } = await request.put(`/recipes/${id}`, changedDescriptionRecipe)
            console.log('put');
            // console.log(data);
            setRecipes(recipes.map(recipe => recipe.id === data.id ? { ...recipe, preparation: data.preparation, tips: data.tips } : recipe));

        } else alert('Pole "Przygotowanie" nie może być puste')
    }


    return (
        <div className="col mt-4">
            <form onSubmit={handleDescriptionFormSubmit(id)}>
                <h4 className="mb-3">Przygotowanie</h4>
                <textarea className="form-control mb-5" rows="10" placeholder="Wpisz opis" value={preparationInput} onChange={handlePreparationChange} />
                <h4 className="mb-3">Porada</h4>
                <textarea className="form-control mb-5" rows="5" placeholder="Wpisz poradę" value={tipsInput} onChange={handleTipsChange} />
                <button className="btn btn-primary btn-sm">Dodaj opisy</button>
            </form>
        </div>

    );
}

DescriptionForm.defaultProps = {
    preparation: "",
    tips: "",
};

export default DescriptionForm;