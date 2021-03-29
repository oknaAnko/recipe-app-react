import React, { useContext } from 'react';

import Recipe from './Recipe';

import { StoreContext } from '../../store/StoreProvider';


const RecipePage = ({ match }) => {
    const { recipes } = useContext(StoreContext);

    const recipe = recipes
        .filter(recipe => recipe.title === match.params.id)
        .map(recipe => <Recipe key={recipe.id} {...recipe} />);

    console.log(recipe);

    return (
        <article>
            {recipe}
        </article>
    );
}

export default RecipePage;