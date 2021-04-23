import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// import CreateRecipePage from '../EditRecipePage/CreateRecipePage';
import EditRecipePage from '../EditRecipePage/EditRecipePage';
import HomePage from '../HomePage/HomePage';
import RecipeListPage from '../RecipeListPage/RecipeListPage'
import RecipePage from '../RecipePage/RecipePage';


const Content = () => {

    return (
        <main className="content max-width mx-auto pt-5">
            <Switch>
                <Route exact path="/" component={HomePage} />
                {/* <Route exact path="/add" component={CreateRecipePage} /> */}
                <Route path="/przepisy/:category/:name" component={RecipeListPage} />
                <Route exact path="/:title" component={RecipePage} />
                <Route path="/:title/edit" component={EditRecipePage} />
                <Redirect to="/" />
            </Switch>
        </main>
    );
}

export default Content;