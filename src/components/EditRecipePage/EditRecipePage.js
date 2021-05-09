import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import DescriptionForm from '../Form/DescriptionForm';
import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';
import TitleForm from '../Form/TitleForm';

import { StoreContext } from '../../store/StoreProvider';


const EditRecipePage = ({ match }) => {
    const isEditMode = true;

    const { recipes } = useContext(StoreContext);

    const recipe = recipes.filter(recipe => recipe.title === match.params.title);

    const title = recipe.map(recipe => <TitleForm key={recipe.id} id={recipe.id} title={recipe.title} />);

    const ingredients = recipe.map(recipe => <Ingredients key={recipe.id} id={recipe.id} ingredients={recipe.ingredients} isEditMode={isEditMode} />);

    const description = recipe.map(recipe => <DescriptionForm key={recipe.id} id={recipe.id} preparation={recipe.preparation} tips={recipe.tips} />);

    const tags = recipe.map(recipe => <Tags key={recipe.id} id={recipe.id} tags={recipe.tags} isEditMode={isEditMode} />);


    return (
        <div>
            <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto mb-5 text-center">
                {title}
            </div>
            <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto">
                {Boolean(recipe.length) ?
                    <div className="row row-cols-2 mt-4">
                        {ingredients}
                        {description}
                    </div>
                    : <div className="row row-cols-2 mt-4">
                        <Ingredients isEditMode={isEditMode} />
                        <DescriptionForm />
                    </div>}
                <div className="row my-5">
                    <div className="col">
                        {Boolean(recipe.length) ? tags : <Tags isEditMode={isEditMode} />}
                    </div>
                </div>
                <div className="text-center">
                    <Link to="/preview" className="btn btn-success">Podgląd</Link>
                    <Link to="/admin" className="btn btn-danger ms-4">Usuń przepis</Link>
                </div>
            </div>
        </div>
    );
}

export default EditRecipePage;