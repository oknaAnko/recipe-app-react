import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateRecipePage from '../CreateRecipePage/CreateRecipePage';
import EditRecipePage from '../EditRecipePage/EditRecipePage';
import HomePage from '../HomePage/HomePage';
import RecipeListPage from '../RecipeListPage/RecipeListPage';
import RecipePage from '../RecipePage/RecipePage';
import SearchedRecipesPage from '../SearchedRecipesPage/SearchedRecipesPage';

const Content = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/add' component={CreateRecipePage} />
        <Route exact path='/przepisy' component={RecipeListPage} />
        <Route path='/przepisy/:searchTerm' component={SearchedRecipesPage} />
        <Route exact path='/:idParam' component={RecipePage} />
        <Route path='/:idParam/edit' component={EditRecipePage} />
        <Redirect to='/' />
      </Switch>
    </main>
  );
};

export default Content;
