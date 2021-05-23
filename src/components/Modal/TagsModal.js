import React, { useContext } from 'react';

import { INGREDIENTS_CATEGORIES } from '../../helpers/constants';
import request from '../../helpers/request';

import { StoreContext } from '../../store/StoreProvider';

const TagsModal = ({ recipeId, recipeTags, currentTags, setCurrentTags }) => {

    const { allTags } = useContext(StoreContext);

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const checkedTag = allTags.find(obj => {
                return obj.name === e.target.name
            });

            let newCurrentTags = [...currentTags];

            newCurrentTags.push(checkedTag);

            setCurrentTags(newCurrentTags);
        }
        else {
            const newCurrentTags = currentTags.filter(tag => e.target.name !== tag.name);

            setCurrentTags(newCurrentTags);
        }
    }

    const isCurrentlyChecked = (currentTag) => {
        let i;
        for (i = 0; i < currentTags.length; i++) {
            if (currentTags[i].id === currentTag.id) {
                return true;
            }
        }

        return false;
    }

    const handleTagsFormSubmit = recipeId => e => {
        e.preventDefault();

        if (currentTags.length > recipeTags.length) {
            const newRecipeTags = currentTags.filter(recipeTag => !recipeTags.some(currentTag => recipeTag.id === currentTag.id));

            let promises = [];

            let i;
            for (i = 0; i < newRecipeTags.length; i++) {
                const promise = request.post(`/recipes/${recipeId}/tags`, newRecipeTags[i]);
                promises.push(promise);
            }

            Promise.all(promises).then(res => {
                const { data } = res
                console.log(data);
            })

        } else if (currentTags.length < recipeTags.length) {
            const deletedRecipeTags = recipeTags.filter(recipeTag => !currentTags.some(currentTag => recipeTag.id === currentTag.id));

            let promises = [];

            let i;
            for (i = 0; i < deletedRecipeTags.length; i++) {
                const promise = request.delete(`/recipes/${recipeId}/tags/${deletedRecipeTags[i].id}`, deletedRecipeTags[i]);
                promises.push(promise);
            }

            Promise.all(promises).then(res => {
                const { data } = res
                console.log(data);
            })

        } else return null;
    };


    const sweetCheckboxes = allTags
        .filter(tag => tag.category === INGREDIENTS_CATEGORIES.słodkie)
        .map(tag => {
            return (
                <div className="form-check" key={tag.id}>
                    <input className="form-check-input" type="checkbox"
                        name={tag.name}
                        onChange={handleCheckboxChange}
                        checked={isCurrentlyChecked(tag)}
                        value=""
                        id={`${tag.id}`} />
                    <label className="form-check-label" htmlFor={`${tag.id}`}>
                        {tag.name}</label>
                </div>)
        });

    const saltyCheckboxes = allTags
        .filter(tag => tag.category === INGREDIENTS_CATEGORIES.słone)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isCurrentlyChecked(tag)}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const cerealCheckboxes = allTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.zbożowe)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isCurrentlyChecked(tag)}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const meatCheckboxes = allTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.mięso)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isCurrentlyChecked(tag)}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const vegetableCheckboxes = allTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.warzywa)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isCurrentlyChecked(tag)}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const fruitCheckboxes = allTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.owoce)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isCurrentlyChecked(tag)}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleTagsFormSubmit(recipeId)}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Wybierz tagi:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 mt-3">
                                        <div className="row row-cols-2 g-3">
                                            <div className="col">
                                                <h6>SŁODKIE</h6>
                                                {sweetCheckboxes}
                                            </div>
                                            <div className="col">
                                                <h6>ZBOŻOWE</h6>
                                                {cerealCheckboxes}
                                            </div>
                                            <div className="col">
                                                <h6>SŁONE</h6>
                                                {saltyCheckboxes}
                                            </div>
                                            <div className="col">
                                                <h6>MIĘSO</h6>
                                                {meatCheckboxes}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-3">
                                        <h6>WARZYWA</h6>
                                        {vegetableCheckboxes}
                                    </div>
                                    <div className="col mt-3">
                                        <h6>OWOCE</h6>
                                        {fruitCheckboxes}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Zapisz</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TagsModal;