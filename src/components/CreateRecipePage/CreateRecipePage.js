import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import request from '../../helpers/request';
 
import { addRecipe } from '../../store/recipes/actions';


const CreateRecipePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [titleInput, setTitleInput] = useState(""); 

    const handleTitleChange = (e) => setTitleInput(e.target.value);

    const handleCreateRecipeSubmit = async e => {
        e.preventDefault();

        const newRecipe = {
            title: titleInput,
            ingredients: [],
            tags: [],
        };

        if (titleInput.length) {
            const { data } = await request.post('/recipes', newRecipe)
            // console.log('post');      
            // console.log(data);
            dispatch(addRecipe(data));

        } else alert('pole nie może być puste');

        const location = {
            pathname: `/${titleInput}/edit`
        };

        history.push(location);
    }


    return (
        <div className="bg-light text-center shadow edit-container">
            <section>
                <p className="edit-title">Utwórz przepis</p>
                <form onSubmit={handleCreateRecipeSubmit}>
                    <input type="text" className="form-control mb-5 w-75 mx-auto" placeholder="Wpisz tytuł" value={titleInput} onChange={handleTitleChange} />
                    <button className="btn btn-success" type="submit">Utwórz</button>
                </form>
            </section>
        </div>
    );
}

CreateRecipePage.defaultProps = {
    title: "",
};

export default CreateRecipePage;