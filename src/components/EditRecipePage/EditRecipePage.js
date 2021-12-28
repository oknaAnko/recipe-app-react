import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DescriptionForm from '../Form/DescriptionForm';
import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';
import TitleForm from '../Form/TitleForm';
 
import { getAllRecipes } from '../../store/recipes/selectors';


const EditRecipePage = ({ match }) => {
    const isEditMode = true;

    const recipes = useSelector(getAllRecipes);

    const recipe = recipes.filter(recipe => recipe.title === match.params.title);

    const title = recipe.map(recipe => <TitleForm key={recipe.id} id={recipe.id} title={recipe.title} />);

    const ingredients = recipe.map(recipe => <Ingredients key={recipe.id} id={recipe.id} ingredients={recipe.ingredients} isEditMode={isEditMode} />);

    const description = recipe.map(recipe => <DescriptionForm key={recipe.id} id={recipe.id} preparation={recipe.preparation} tips={recipe.tips} />);

    const tags = recipe.map(recipe => <Tags key={recipe.id} id={recipe.id} tags={recipe.tags} isEditMode={isEditMode} />);


    return (
        <article>
            <div className="bg-light shadow text-center edit-container">
                {title}
            </div>
            <div className="bg-light shadow edit-container">
                {Boolean(recipe.length) ?
                    <section className="row row-cols-1 row-cols-md-2">
                        {ingredients}
                        {description}
                    </section>
                    : <section className="row row-cols-1 row-cols-md-2">
                        <Ingredients isEditMode={isEditMode} />
                        <DescriptionForm />
                    </section>}
                <section className="row my-5">
                    {Boolean(recipe.length) ? tags : <Tags isEditMode={isEditMode} />}
                </section>
                <div className="text-center">
                    <Link to="/preview" className="btn btn-success">Podgląd</Link>
                    <Link to="/admin" className="btn btn-danger ms-4">Usuń przepis</Link>
                </div>
            </div>
        </article>
    );
}

export default EditRecipePage;