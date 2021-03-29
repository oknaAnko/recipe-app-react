import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { StoreContext } from '../../store/StoreProvider';


const Header = () => {

    const { user, setUser } = useContext(StoreContext);

    const handleOnLoginClick = () => {
        if (Boolean(user)) {
            setUser(null)
        } else {
            console.log("open loginform")
        }
    };

    const handleOnRegisterClick = () => {
        console.log('open loginform');
    };

    const setLoginLabel = Boolean(user) ? "Wyloguj się" : "Zaloguj się";

    return (
        <header className="border-bottom bg-light navbar-light shadow-sm">
            <div className="max-width mx-auto">
                <nav className="navbar navbar-expand-lg border-bottom">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand fs-2 fw-bold" >aA</Link>
                        <h1><Link to="/" className="navbar-brand fs-2 fw-bold">Kuchnia bez jajka i pszenicy</Link></h1>
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-outline-primary btn-sm" onClick={handleOnLoginClick}>{setLoginLabel}</button>
                            <button className="btn btn-primary btn-sm ms-2" onClick={handleOnRegisterClick}>Załóż konto</button>
                        </div>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <button className="btn btn-light dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Słodkie</button>
                                    <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                                        <li><Link to="#" className="dropdown-item" >Action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Another action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Something else here</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="btn btn-light ms-4 dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Słone</button>
                                    <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                                        <li><Link to="#" className="dropdown-item" >Action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Another action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Something else here</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="btn btn-light ms-4 dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Składniki</button>
                                    <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                                        <li><Link to="#" className="dropdown-item" >Action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Another action</Link></li>
                                        <li><Link to="#" className="dropdown-item" >Something else here</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control" type="search" placeholder="Szukaj" aria-label="Search" />
                                <button className="btn btn-outline-primary ms-2" type="submit">Szukaj</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;