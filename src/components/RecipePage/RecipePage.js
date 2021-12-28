import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import Recipe from './Recipe';

import { StoreContext } from '../../store/StoreProvider';
import { getAllRecipes } from '../../store/recipes/selectors';


const RecipePage = ({ match }) => {
    const recipes = useSelector(getAllRecipes);

    const recipe = recipes
        .filter(recipe => recipe.title === match.params.title)
        .map(recipe => <Recipe key={recipe.id} {...recipe} />);

    console.log(recipe);

    return (
        <article>
            {recipe}
        </article>
    );
}

export default RecipePage;