import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchedRecipes } from '../../store/recipes/actions';
import { SEARCH_ICON } from '../../helpers/icons';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchRecipeChange = (e) => setSearchInput(e.target.value);

  const dispatch = useDispatch();
  const searchRecipes = (searchTerm) => dispatch(fetchSearchedRecipes(searchTerm));

  const handleSearchBarFormSubmit = (e) => {
    e.preventDefault();
    searchRecipes(searchInput);
  };

  return (
    <form onSubmit={handleSearchBarFormSubmit}>
      <div className='input-group mx-auto input-search rounded-start'>
        <input
          type='text'
          className='form-control '
          placeholder='Szukaj przepisu'
          value={searchInput}
          onChange={handleSearchRecipeChange}
          aria-describedby='button-addon2'
        />
        <button className='btn btn-icon-search rounded-end' type='submit' id='button-addon2'>
          {SEARCH_ICON}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
