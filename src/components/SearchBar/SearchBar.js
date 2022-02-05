import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchSearchedRecipes } from '../../store/recipes/actions';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchRecipeChange = (e) => setSearchInput(e.target.value);

  const history = useHistory();
  const dispatch = useDispatch();
  const searchRecipes = (searchTerm) => dispatch(fetchSearchedRecipes(searchTerm));

  const handleSearchBarFormSubmit = (e) => {
    e.preventDefault();
    searchRecipes(searchInput);

    const location = {
      pathname: `/przepisy/${searchInput}`,
    };

    history.push(location);
  };

  return (
    <form onSubmit={handleSearchBarFormSubmit}>
      <div className='input-group mx-auto'>
        <input
          type='text'
          className='form-control '
          placeholder='Szukaj przepisu'
          value={searchInput}
          onChange={handleSearchRecipeChange}
          aria-describedby='button-addon2'
        />
        <button className='btn btn-primary rounded-2' type='submit' id='button-addon2'>
          Szukaj
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
