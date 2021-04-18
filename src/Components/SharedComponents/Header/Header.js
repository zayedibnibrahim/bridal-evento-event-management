import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/bridal-evento-logo.jpg'
const Header = () => {
    return (
        <section className="header-bg-transparent">
            <nav className="container navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <img style={{ borderRadius: '50%' }} src={logo} alt="" width='80' />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        <Link to="/login" className="btn brand-btn">Login</Link>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;