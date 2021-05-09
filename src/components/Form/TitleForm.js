import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router';

import request from '../../helpers/request';

import { StoreContext } from '../../store/StoreProvider';


const TitleForm = ({ id, title }) => {

    const [titleInput, setTitleInput] = useState(title);
    const [isConfirmed, setIsConfirmed] = useState(true);

    const { recipes, setRecipes } = useContext(StoreContext);

    const history = useHistory();

    const componentMounted = useRef(false);

    const handleTitleChange = e => setTitleInput(e.target.value);


    const handleTitleFormSubmit = id => async e => {
        e.preventDefault();

        componentMounted.current = true;

        const changedTitleRecipe = {
            id,
            title: titleInput,
        };

        if (titleInput.length || !titleInput.incudes('?')) {
            const { data } = await request.put(`/recipes/${id}`, changedTitleRecipe)
            console.log('put');

            if (componentMounted.current) {
                setRecipes(recipes.map(recipe => recipe.id === data.id ? { ...recipe, title: data.title } : recipe));
            }

            const location = {
                pathname: `/${data.title}/edit`
            };
            history.push(location);

        } else alert('pole nie może być puste');

        if (titleInput === title) setIsConfirmed(true);

        return () => {
            componentMounted.current = false;
        }

    };


    const handleChangeTitleBtnClick = () => {
        setIsConfirmed(false)
    }

    const handleCancelChangesBtnClick = () => {
        setIsConfirmed(true);
        setTitleInput(title)

    }


    return (
        <section>
            <h3>Edycja przepisu:</h3>
            { isConfirmed ?
                <div>
                    <p className="fw-bold fs-2 m-4">{titleInput}</p>
                    <button className="btn btn-primary" onClick={handleChangeTitleBtnClick}>Zmień</button>
                </div>
                : <form onSubmit={handleTitleFormSubmit(id)}>
                    <input type="text" className="form-control my-5 w-75 mx-auto" placeholder="Wpisz tytuł" value={titleInput} onChange={handleTitleChange} />
                    <button className="btn btn-primary" type="submit">Zatwierdź zmiany</button>
                    <button className="btn btn-primary" onClick={handleCancelChangesBtnClick}>Anuluj</button>
                </form>

            }
        </section>
    );
}

TitleForm.defaultProps = {
    id: "",
    title: "",
};

export default TitleForm;