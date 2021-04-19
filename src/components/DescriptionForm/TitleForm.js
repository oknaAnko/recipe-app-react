import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import request from '../../helpers/request';

// import { StoreContext } from '../../store/StoreProvider';


const TitleForm = ({ id, title, isEditMode, setIsNewRecipeCreated, isNewRecipeCreated }) => {
    console.log(title);

    const [titleInput, setTitleInput] = useState(title);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleTitleChange = (e) => setTitleInput(e.target.value);

    const handleTitleFormSubmit = id => async e => {
        e.preventDefault();

        const newRecipe = {
            title: titleInput,
        };

        const changedTitleRecipe = {
            id,
            title: titleInput,
        };


        if (titleInput.length) {

            if (isNewRecipeCreated) {
                const { data } = await request.put(`/recipes/${id}`, changedTitleRecipe)
                console.log('pposzedł put');
                console.log(data);
            } else {
                const { data } = await request.post('/recipes', newRecipe)
                console.log('pposzedł post');
                console.log(data);
                setIsNewRecipeCreated(true);
            }

            setIsConfirmed(true)
        } else alert('pole nie może być puste')
    }

    const handleBtnClick = () => {
        setIsConfirmed(false)
    }

    const toggleSubmitBtnLabel = !isEditMode
        ? isNewRecipeCreated ? "Zatwierdź zmiany" : "Utwórz"
        : "Zatwierdź zmiany"

    const pageTitle = () => {
        if (!isNewRecipeCreated) return "Utwórz przepis"
        else {
            if (isConfirmed) {
                if (!isEditMode) return "Utworzono przepis!";
                else return "Zatwierdzono";
            } else return "Edytuj przepis"
        }
    }


    return (
        <div>
            <h3>{pageTitle()}</h3>
            { isConfirmed ?
                <div>
                    <p className="display-4">{titleInput}</p>
                    {isEditMode
                        ? <button className="btn btn-primary btn-lg" onClick={handleBtnClick}>Zmień ponownie</button>
                        : <Link to={`/${titleInput}/edit`} className="btn btn-primary btn-lg">Zmień</Link>
                    }
                </div>
                : <form onSubmit={handleTitleFormSubmit(id)}>
                    <input type="text" className="form-control my-5 w-75 mx-auto" placeholder="Wpisz tytuł" value={titleInput} onChange={handleTitleChange} />
                    <button className="btn btn-primary btn-lg" type="submit">{toggleSubmitBtnLabel}</button>
                </form>

            }
        </div>
    );
}

TitleForm.defaultProps = {
    title: "",
    isEditMode: false,
};

export default TitleForm;