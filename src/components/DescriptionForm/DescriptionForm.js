import React, { useState } from 'react';


const DescriptionForm = ({ title, preparation, tips }) => {

    const [titleInput, setTitleInput] = useState(title);
    const [preparationInput, setPreparationInput] = useState(preparation);
    const [tipsInput, setTipsInput] = useState(tips);

    const handleTitleChange = (e) => setTitleInput(e.target.value);
    const handlePreparationChange = (e) => setPreparationInput(e.target.value);
    const handleTipsChange = (e) => setTipsInput(e.target.value);


    return (
        <div className="col ps-4">
            <form action="">
                <input type="text" className="form-control mb-5" placeholder="Wpisz tytuł" value={titleInput} onChange={handleTitleChange} />
                <h4 className="mb-3">Przygotowanie</h4>
                <textarea className="form-control mb-5" rows="10" placeholder="Wpisz opis" value={preparationInput} onChange={handlePreparationChange} />
                <h4 className="mb-3">Porada</h4>
                <textarea className="form-control mb-5" rows="5" placeholder="Wpisz poradę" value={tipsInput} onChange={handleTipsChange} />
                <button className="btn btn-primary">Zapisz</button>
            </form>
        </div>

    );
}

export default DescriptionForm;