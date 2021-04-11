import React from 'react';

import TagsModal from '../Modal/TagsModal';


const Tags = ({ isEditMode, tags, id }) => {

    const recipeTags = tags
        .filter(tag => tag.active)
        .map(tag => <li key={tag.id}>{tag.name}</li>);

    return (
        <div className="py-2">
            <h4>Tagi</h4>
            <ul>
                {recipeTags}
            </ul>
            {/* EditMode: */}
            {isEditMode && <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">DODAJ</button>}
            <TagsModal recipeTags={tags} recipeId={id} />
        </div>
    );
}

export default Tags;