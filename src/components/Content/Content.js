import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import EditRecipePage from '../EditRecipePage/EditRecipePage';
import HomePage from '../HomePage/HomePage';
import RecipeListPage from '../RecipeListPage/RecipeListPage'
import RecipePage from '../RecipePage/RecipePage';


const Content = () => {

    return (
        <main className="content max-width mx-auto pt-5">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/add" component={EditRecipePage} />
                <Route path="/przepisy/:category/:name" component={RecipeListPage} />
                <Route exact path="/:id" component={RecipePage} />
                <Route path="/:id/edit" component={EditRecipePage} />
                <Redirect to="/" />
            </Switch>
        </main>
    );
}

export default Content;