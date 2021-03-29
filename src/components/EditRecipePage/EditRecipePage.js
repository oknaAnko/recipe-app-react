import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import DescriptionForm from '../DescriptionForm/DescriptionForm';
import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';

import { StoreContext } from '../../store/StoreProvider';


const EditRecipePage = ({ match }) => {
    const isEditMode = true;

    const { recipes } = useContext(StoreContext);
    const recipe = recipes.filter(recipe => recipe.title === match.params.id);

    const ingredients = recipe.map(recipe => <Ingredients key={recipe.id} ingredients={recipe.ingredients} isEditMode={isEditMode} />);

    const description = recipe.map(recipe => <DescriptionForm key={recipe.id} title={recipe.title} preparation={recipe.preparation}
        tips={recipe.tips} isEditMode={isEditMode} />);

    const tags = recipe.map(recipe => <Tags key={recipe.id} tags={recipe.tags} />);

    return (
        <div className="bg-light p-3 rounded-3 shadow w-75 mx-auto">
            {recipe.length ?
                <div className="row row-cols-2 mt-4">
                    {ingredients}
                    {description}
                </div>
                : <div className="row row-cols-2 mt-4">
                    <Ingredients />
                    <DescriptionForm />
                </div>}
            <div className="row mt-5">
                <div className="col">
                    {tags}
                </div>
            </div>
            <Link to="/preview" className="btn btn-primary">Podgląd</Link>
            <Link to="/admin" className="btn btn-primary ms-2">Anuluj</Link>
        </div>
    );
}

export default EditRecipePage;