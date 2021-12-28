import React, { createContext, useEffect, useState, useRef } from 'react';

import request from '../helpers/request';


export const StoreContext = createContext(null);


const StoreProvider = ({ children }) => { 
    const [allTags, setAllTags] = useState([]);
    const [user, setUser] = useState(null); 

    const componentMounted = useRef(false); 

    const getAllTags = async () => {
        try {
            //setRecipeError({})
            const { data } = await request.get('/tags');
            if (componentMounted.current) setAllTags(data)
        } catch (err) {
           // setRecipeError(err)
        }
    };

    useEffect(() => {
        componentMounted.current = true;
        // getAllRecipes();
        getAllTags();
        return () => { componentMounted.current = false }
    }, []);

    return (
        <StoreContext.Provider value={{ allTags, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;