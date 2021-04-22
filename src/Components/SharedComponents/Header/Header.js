import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import './Header.css'
import jwt_decode from "jwt-decode";
import logo from '../../../images/bridal-evento-logo.jpg'
import firebase from "firebase/app";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'



const Header = () => {
    const [isAdmin, setIsAdmin] = useState(null)
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { email } = loggedInUser;
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
    //Handle Log Out
    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                sessionStorage.removeItem('token')
                setLoggedInUser({})
                setIsAdmin(false)
            }).catch((error) => {
                // An error happened.
            });
    }
    
    //check If Admin
    useEffect(() => {
        axios.post('https://serene-gorge-64668.herokuapp.com/isAdmin', { email })
            .then(res => {
                if (res.data === true) {
                    setIsAdmin(true)
                }
            })
    }, [{ email }])
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
                            {
                                isAdmin && <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookingList">View Orders</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#gallery">Gallery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#testimonials">Reviews</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contactus">Contact Us</a>
                            </li>
                        </ul>
                        {
                            loggedInUser.email ? <div><img className="userImg" src={loggedInUser.photo} alt="" /> <span onClick={logoutHandler} className="logout-btn">| <FontAwesomeIcon icon={faSignOutAlt} /> Logout</span></div> : <Link className="btn brand-btn" to='/login'><FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;