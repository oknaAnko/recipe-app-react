import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ title }) => {

    return (
        <div className="col h-100">
            <div className="card text-center" >
                <img src="https://via.placeholder.com/200x150" className="card-img-top p-2 img-fluid" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/${title}`} className="btn btn-outline-info">{title}</Link>
                    </h5>
                    {/* EditMode: */}
                    <div className="card-footer">
                        <small className="text-muted"><Link to={`/${title}/edit`} className="btn btn-primary btn-sm">Edytuj</Link></small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
