import React, { createContext, useEffect, useState } from 'react';
import request from '../helpers/request';


export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);

    const getData = async () => {
        const { data } = await request.get('/recipes');
        setRecipes(data)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <StoreContext.Provider value={{ recipes, setRecipes, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;