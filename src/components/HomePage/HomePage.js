import React, { useContext } from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

import { StoreContext } from '../../store/StoreProvider';


const Home = () => {

    const { isLoading, recipes } = useContext(StoreContext);

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