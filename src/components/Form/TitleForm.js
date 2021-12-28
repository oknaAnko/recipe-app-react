import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import request from '../../helpers/request'; 
 
import { editRecipe } from '../../store/recipes/actions';


const TitleForm = ({ id, title }) => {

    const [titleInput, setTitleInput] = useState(title);
    const [isConfirmed, setIsConfirmed] = useState(true);
 
    const dispatch = useDispatch();
    const updateRecipe = (id, recipe) => dispatch(editRecipe({ id, recipe }));

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
                updateRecipe(data.id, { title: data.title });
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
            <p className="edit-title">Edycja przepisu:</p>
            { isConfirmed ?
                <div>
                    <h3 className="fw-bold m-4">{titleInput}</h3>
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