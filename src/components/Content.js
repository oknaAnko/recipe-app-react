import React, { useContext } from 'react';

import { StoreContext } from '../store/StoreProvider';

const Content = () => {

    const { recipes } = useContext(StoreContext);
    console.log(recipes);

    return (
        <main>Content
        </main>
    );
}

export default Content;