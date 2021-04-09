import React from 'react';
import { Link } from 'react-router-dom';

import Ingredients from '../Ingredients/Ingredients';
import Tags from '../Tags/Tags';


const Recipe = ({ preparation, ingredients, tips, title, tags }) => {

    return (
        <div className="bg-light p-3 rounded-3 shadow w-75 mx-auto">
            <div className="container">
                <div className="row">
                    <h3 className="col text-center fw-bold m-4 display-6">{title}</h3>
                </div>
                <div className="row row-cols-2 mt-4">
                    <div className="col border-end border-3">
                        <Ingredients ingredients={ingredients} />
                    </div>
                    <div className="col ps-4">
                        <h4 className="mb-4">Przygotowanie</h4>
                        <p className="card-text">{preparation}</p>
                        <div className="d-inline-block border border-primary border-3 rounded-3 p-3 mt-3">
                            <h4>Porady</h4>
                            <p className="card-text">{tips}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Tags tags={tags} />
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-block">
                    <Link to="/" className="btn btn-primary btn-sm" role="button">Powrót</Link>
                    {/* EditMode: */}
                    <Link to={`/${title}/edit`} className="btn btn-primary btn-sm ms-2" role="button">Edytuj</Link>
                    <Link to={`/add`} className="btn btn-primary btn-sm ms-2" role="button">Dodaj przepis</Link>
                </div>
            </div>
        </div>
    );
}

export default Recipe;