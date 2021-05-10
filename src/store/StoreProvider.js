import React, { createContext, useEffect, useState, useRef } from 'react';

import request from '../helpers/request';


export const StoreContext = createContext(null);


const StoreProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [recipeError, setRecipeError] = useState({});

    const componentMounted = useRef(false);

    const getAllRecipes = async () => {
        setIsLoading(true);
        try {
            setRecipeError({})
            const { data } = await request.get('/recipes');
            if (componentMounted.current) setRecipes(data)
        } catch (err) {
            setRecipeError(err)
        }
        setIsLoading(false);
    };

    const getAllTags = async () => {
        try {
            setRecipeError({})
            const { data } = await request.get('/tags');
            if (componentMounted.current) setAllTags(data)
        } catch (err) {
            setRecipeError(err)
        }
    };

    useEffect(() => {
        componentMounted.current = true;
        getAllRecipes();
        getAllTags();
        return () => { componentMounted.current = false }
    }, []);

    return (
        <StoreContext.Provider value={{ isLoading, recipeError, recipes, setRecipes, allTags, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;