import React from 'react';
import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Proyecto</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to="/" className="nav-link">Balances</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/abm" className="nav-link">Operaciones</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;