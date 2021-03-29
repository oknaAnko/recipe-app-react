import React, { useContext } from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

import { StoreContext } from '../../store/StoreProvider';


const Home = () => {
    const { recipes } = useContext(StoreContext);

    const allRecipesCards = recipes.map(recipeCard =>
        <RecipeCard key={recipeCard.id} {...recipeCard} />)

    return (
        <section className="container">
            <div className="row row-cols-1 row-cols-md-4">
                {allRecipesCards}
            </div>
        </section>
    );
}

export default Home;