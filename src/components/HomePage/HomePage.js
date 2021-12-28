import React from 'react';
import { useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';
 
import { getAllRecipes, getRecipesLoadingStatus } from '../../store/recipes/selectors';


const Home = () => {
    const recipes = useSelector(getAllRecipes);
    const isLoading = useSelector(getRecipesLoadingStatus);

    const allRecipesCards = recipes.map(recipeCard =>
        <RecipeCard key={recipeCard.id} {...recipeCard} />)

    return (
        <div>
            <section className="container">
                {isLoading && <p>Ładuję przepisy...</p>}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
                    {allRecipesCards}
                </div>
            </section>
        </div>
    );
}

export default Home;