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
        <section>
            <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto mb-5 text-center">
                <h3>Utwórz przepis</h3>
                <form onSubmit={handleCreateRecipeSubmit}>
                    <input type="text" className="form-control my-5 w-75 mx-auto" placeholder="Wpisz tytuł" value={titleInput} onChange={handleTitleChange} />
                    <button className="btn btn-success" type="submit">Utwórz</button>
                </form>


            </div>
        </section>
    );
}

CreateRecipePage.defaultProps = {
    title: "",
};

export default CreateRecipePage;


