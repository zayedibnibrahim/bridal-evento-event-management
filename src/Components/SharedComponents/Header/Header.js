import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import './Header.css'
import jwt_decode from "jwt-decode";
import logo from '../../../images/bridal-evento-logo.jpg'
import firebase from "firebase/app";
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    useEffect(() => {
        const getSessionToken = sessionStorage.getItem('token');
        if (getSessionToken) {
            const decoded = jwt_decode(getSessionToken);
            const { email, name, picture } = decoded;
            const loggedInUserData = {
                isSignedIn: true,
                photo: picture,
                email: email,
                name: name
            }
            setLoggedInUser(loggedInUserData)
        }

    }, [setLoggedInUser])
    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                sessionStorage.removeItem('token')
                setLoggedInUser({})
            }).catch((error) => {
                // An error happened.
            });
    }
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
                        {
                            loggedInUser.email ? <div><img className="userImg" src={loggedInUser.photo} alt="" /> <span onClick={logoutHandler} className="logout-btn">| Logout</span></div> : <Link className="btn brand-btn" to='/login'> Login
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;