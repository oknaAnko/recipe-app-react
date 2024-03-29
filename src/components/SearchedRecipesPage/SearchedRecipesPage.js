import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getRecipesLoadingStatus } from '../../store/recipes/selectors';
import { fetchSearchedRecipes } from '../../store/recipes/actions';
import RecipeCard from '../RecipeCard/RecipeCard';

const SearchedRecipesPage = ({ match }) => {
  const searchedRecipes = useSelector(getAllRecipes);
  const isLoading = useSelector(getRecipesLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchedRecipes) {
      dispatch(fetchSearchedRecipes(match.params.searchTerm));
    }
  }, []);

  const searchedRecipesCards = searchedRecipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />);

  return (
    <div>
      <div className='content max-width mx-auto pt-5'>
        <section className='container'>
          {isLoading && <p>Ładuję przepisy...</p>}
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4'>{searchedRecipesCards}</div>
        </section>
      </div>
    </div>
  );
};

export default SearchedRecipesPage;
