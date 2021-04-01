import React, { createContext, useEffect, useState } from 'react';
import request from '../helpers/request';


export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState(null);

    const getAllRecipes = async () => {
        const { data } = await request.get('/recipes');
        setRecipes(data)
    };

    const getAllTags = async () => {
        const { data } = await request.get('/tags');
        setTags(data)
    }

    useEffect(() => {
        getAllRecipes();
        getAllTags();
    }, [])

    return (
        <StoreContext.Provider value={{ recipes, setRecipes, tags, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;