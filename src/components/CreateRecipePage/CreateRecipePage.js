import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import request from '../../helpers/request';

import { StoreContext } from '../../store/StoreProvider';


const CreateRecipePage = () => {

    const [titleInput, setTitleInput] = useState("");

    const { setRecipes } = useContext(StoreContext);

    const history = useHistory();

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
            setRecipes(prev => [...prev, data]);

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