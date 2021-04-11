
import React, { useContext } from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

import { StoreContext } from '../../store/StoreProvider';

const RecipeListPage = ({ match }) => {
    const { recipes } = useContext(StoreContext);

    let selectedRecipeIndex = []

    recipes.forEach((recipe, index) => {
        const selectedTags = recipe.tags.filter(tag => tag.name === match.params.name && tag.active === true)

        if (selectedTags.length) selectedRecipeIndex.push(index)
    })

    const selectedRecipesCards = recipes
        .filter(recipe => {
            for (const i of selectedRecipeIndex) {
                if (i === Number(recipe.id)) return true
            }
            return false
        })
        .map(recipe => <RecipeCard key={recipe.id} {...recipe} />)

    return (
        <section className="container">
            <div className="row row-cols-1 row-cols-md-4">
                {selectedRecipesCards}
            </div>
        </section>
    );
}

export default RecipeListPage;