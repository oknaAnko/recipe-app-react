import React, { useState } from 'react';

import request from '../../helpers/request';
import { INGREDIENTS_CATEGORIES } from '../../helpers/constants';

const TagsModal = ({ recipeTags, recipeId }) => {


    const initialIsChecked = recipeTags
        .map(tag => ({ [tag.name]: tag.active }))
        .reduce((obj1, obj2) => Object.assign(obj1, obj2), {})

    const [isChecked, setIsChecked] = useState(initialIsChecked)

    const handleCheckboxChange = (e) => {
        setIsChecked({
            ...isChecked, [e.target.name]: e.target.checked
        })
    }

    const handleTagsFormSubmit = id => async e => {
        e.preventDefault();

        const checkedNames = Object.keys(isChecked).filter(key => isChecked[key] === true);

        const newRecipeTags = recipeTags.map(tag => {
            for (const name of checkedNames) {
                if (name === tag.name) tag.active = true;
            }
            return tag
        });

        await request.put(`/recipes/${id}/tags`, newRecipeTags);
    };


    const sweetCheckboxes = recipeTags
        .filter(tag => tag.category === INGREDIENTS_CATEGORIES.słodkie)
        .map(tag => {
            return (
                <div className="form-check" key={tag.id}>
                    <input className="form-check-input" type="checkbox"
                        name={tag.name}
                        onChange={handleCheckboxChange}
                        checked={isChecked[tag.name]}
                        value=""
                        id={`${tag.id}`} />
                    <label className="form-check-label" htmlFor={`${tag.id}`}>
                        {tag.name}</label>
                </div>)
        });

    const saltyCheckboxes = recipeTags
        .filter(tag => tag.category === INGREDIENTS_CATEGORIES.słone)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isChecked[tag.name]}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const cerealCheckboxes = recipeTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.zbożowe)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isChecked[tag.name]}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const meatCheckboxes = recipeTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.mięso)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isChecked[tag.name]}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const vegetableCheckboxes = recipeTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.warzywa)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isChecked[tag.name]}
                    value=""
                    id={`${tag.id}`} />
                <label className="form-check-label" htmlFor={`${tag.id}`}>
                    {tag.name}</label>
            </div>));

    const fruitCheckboxes = recipeTags
        .filter(tag => tag.subcategory === INGREDIENTS_CATEGORIES.owoce)
        .map(tag => (
            <div className="form-check" key={tag.id}>
                <input className="form-check-input"
                    type="checkbox"
                    name={tag.name}
                    onChange={handleCheckboxChange}
                    checked={isChecked[tag.name]}
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
                                    <div className="col-md-6">
                                        <div className="row row-cols-2">
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
                                    <div className="col">
                                        <h6>WARZYWA</h6>
                                        {vegetableCheckboxes}
                                    </div>
                                    <div className="col">
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