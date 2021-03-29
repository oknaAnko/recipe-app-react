import React, { useState } from 'react';

import { CONFIRM_ICON, TRASH_ICON } from '../../helpers/icons';


const IngredientForm = ({ amount, name, unit, deleteIngredient, isNewAdded,
}) => {

    const [amountInput, setAmountInput] = useState(amount);
    const [unitInput, setUnitInput] = useState(unit);
    const [nameInput, setNameInput] = useState(name);

    const handleAmountChange = (e) => setAmountInput(e.target.value);
    const handleUnitChange = (e) => setUnitInput(e.target.value);
    const handleNameChange = (e) => setNameInput(e.target.value);

    const handleIngredientSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form action="" onSubmit={handleIngredientSubmit}>
            <div className="input-group mt-3 ">
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
                {isNewAdded &&
                    <div>
                        <button className="btn btn-outline-primary btn-sm" type="submit">{CONFIRM_ICON}</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={deleteIngredient}>{TRASH_ICON}</button>
                    </div>
                }
            </div>
        </form>
    );
}

export default IngredientForm;