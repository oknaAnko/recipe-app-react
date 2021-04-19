import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import DescriptionForm from '../DescriptionForm/DescriptionForm';
import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';
import TitleForm from '../DescriptionForm/TitleForm';

import { StoreContext } from '../../store/StoreProvider';


const EditRecipePage = ({ match }) => {
    const isEditMode = true;
    // console.log(match.params);

    const [isNewRecipeCreated, setIsNewRecipeCreated] = useState(true);

    const { recipes } = useContext(StoreContext);

    const recipe = recipes.filter(recipe => recipe.title === match.params.id);
    // console.log(recipe);

    const title = recipe.map(recipe => <TitleForm key={recipe.id} id={recipe.id} title={recipe.title} isEditMode={isEditMode} isNewRecipeCreated={isNewRecipeCreated} setIsNewRecipeCreated={setIsNewRecipeCreated} />);
    // console.log(title);

    const ingredients = recipe.map(recipe => <Ingredients key={recipe.id} ingredients={recipe.ingredients} isEditMode={isEditMode} />);

    const description = recipe.map(recipe => <DescriptionForm key={recipe.id} id={recipe.id} title={recipe.title} preparation={recipe.preparation}
        tips={recipe.tips} isEditMode={isEditMode} />);

    const tags = recipe.map(recipe => <Tags key={recipe.id} isEditMode={isEditMode} tags={recipe.tags} id={recipe.id} />);


    return (
        <div>
            <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto mb-5 text-center">
                {Boolean(recipe.length) ? title : <TitleForm setIsNewRecipeCreated={setIsNewRecipeCreated} isNewRecipeCreated={false} />}
            </div>
            <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto">
                {Boolean(recipe.length) ?
                    <div className="row row-cols-2 mt-4">
                        {ingredients}
                        {description}
                    </div>
                    : <div className="row row-cols-2 mt-4">
                        <Ingredients />
                        <DescriptionForm />
                    </div>}
                <div className="row my-5 border-top border-3">
                    <div className="col">
                        {Boolean(recipe.length) ? tags : <Tags isEditMode={isEditMode} />}
                    </div>
                </div>
                <Link to="/preview" className="btn btn-primary">Podgląd</Link>
                <Link to="/admin" className="btn btn-primary ms-2">Anuluj</Link>
            </div>
        </div>
    );
}

export default EditRecipePage;