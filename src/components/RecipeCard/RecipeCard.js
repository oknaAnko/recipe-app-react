import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ title }) => {

    return (
        <div className="col">
            <div className="card" >
                <Link to={`/${title}`} className="btn btn-outline-info fw-bold">
                    <img src="https://via.placeholder.com/200x150" className="card-img-top p-2 img-fluid" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title card-title d-flex align-items-center justify-content-center">
                            {title}
                        </h5>
                    </div>
                </Link>
                {/* EditMode: */}
                <div className="card-footer text-center">
                    <small className="text-muted"><Link to={`/${title}/edit`} className="btn btn-primary btn-sm">Edytuj</Link></small>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
