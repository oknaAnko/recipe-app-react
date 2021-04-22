import React from 'react';
import { Link } from 'react-router-dom';

import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';

import { MESSAGES } from '../../helpers/constants';


const Recipe = ({ preparation, ingredients, tips, title, tags }) => {

    const tipText = Boolean(tips.length) ? tips : MESSAGES.no_tips;

    return (
        <div className="bg-light p-5 rounded-3 shadow w-75 mx-auto">
            <div className="container">
                <div className="row w-75 mx-auto my-5 border border-dark border-2 rounded-3">
                    <h3 className="col text-center fw-bold m-4">{title}</h3>
                </div>
                <div className="row row-cols-2">
                    <div className="col">
                        <h4 className="mb-3 p-2 rounded-3 bg-title">Składniki</h4>
                        <Ingredients ingredients={ingredients} />
                    </div>
                    <div className="col ps-4">
                        <h4 className="mb-3 p-2 rounded-3 bg-title ">Przygotowanie</h4>
                        <p className="card-text lh-lg">{preparation}</p>
                        <div className="d-inline-block w-75 border-tips border-3 rounded-3 p-3 mt-3">
                            <h4 className="p-2">Porady</h4>
                            <p className="card-text">{tipText}</p>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <Tags tags={tags} />
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-block">
                    <Link to="/" className="btn btn-primary btn-sm" role="button">Powrót</Link>
                    {/* EditMode: */}
                    <Link to={`/${title}/edit`} className="btn btn-primary btn-sm ms-2" role="button">Edytuj</Link>
                </div>
            </div>
        </div>
    );
}

export default Recipe;