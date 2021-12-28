import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { fetchAllRecipes } from '../../store/recipes/actions';
import { useDispatch } from 'react-redux'; 

import CreateRecipePage from '../CreateRecipePage/CreateRecipePage';
import EditRecipePage from '../EditRecipePage/EditRecipePage';
import HomePage from '../HomePage/HomePage';
import RecipeListPage from '../RecipeListPage/RecipeListPage'
import RecipePage from '../RecipePage/RecipePage';


const Content = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRecipes());
    }, [dispatch]);

    return (
        <main className="content max-width mx-auto pt-5">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/add" component={CreateRecipePage} />
                <Route path="/przepisy/:category/:name" component={RecipeListPage} />
                <Route exact path="/:title" component={RecipePage} />
                <Route path="/:title/edit" component={EditRecipePage} />
                <Redirect to="/" />
            </Switch>
        </main>
    );
}

export default Content;