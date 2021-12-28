import React from 'react';
import { useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';
 
import { getAllRecipes, getRecipesLoadingStatus } from '../../store/recipes/selectors';


const RecipeListPage = ({ match }) => { 
    const recipes = useSelector(getAllRecipes);
    const isLoading = useSelector(getRecipesLoadingStatus);

    let selectedRecipeIndex = [];

    recipes.forEach((recipe, index) => {

        const selectedTags = recipe.tags.filter(tag => tag.name === match.params.name)

        if (Boolean(selectedTags.length)) selectedRecipeIndex.push(index)
    });

    const selectedRecipesCards = recipes
        .filter(recipe => {
            for (const i of selectedRecipeIndex) {
                if (i === Number(recipe.id)) return true
            }
            return false
        })
        .map(recipe => <RecipeCard key={recipe.id} {...recipe} />);

    return (
        <section className="container">
            {isLoading && <p>Ładuję przepisy...</p>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
                {selectedRecipesCards}
            </div>
        </section>
    );
}

export default RecipeListPage;