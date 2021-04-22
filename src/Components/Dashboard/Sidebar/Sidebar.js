import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../../App';
import logo from '../../../images/bridal-evento-logo.jpg'
import firebase from "firebase/app";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faAtlas, faFolderPlus, faUserPlus, faCogs, faShoppingCart, faList, faStar, faChevronLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [isAdmin, setIsAdmin] = useState(false)
    const { email } = loggedInUser;

    //Load LoggedIn User Info From Session
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

    //logged Out handler
    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                sessionStorage.removeItem('token')
                setLoggedInUser({})
                history.push('/')
            }).catch((error) => {
                // An error happened.
            });
    }

    //check If Admin
    useEffect(() => {
        axios.post('https://serene-gorge-64668.herokuapp.com/isAdmin', {email})
        .then(res => {
            if(res.data === true){
                setIsAdmin(true)
            }
        })
    }, [{email}])
    return (
        <section className="sidebar-section ps-5 pt-5 pb-5">
            <div className="logo-section">
                <img style={{ borderRadius: '50%' }} src={logo} alt="" width='80'/>
            </div>
            <div className="dashboard-menu pt-5">
                <ul className="list-unstyled">
                    {
                        isAdmin && <><li><Link to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link></li>
                        <li><Link to="/allOrder"><FontAwesomeIcon icon={faAtlas} /> All Order</Link></li>
                        <li><Link to="/addService"><FontAwesomeIcon icon={faFolderPlus} /> Add Service</Link></li>
                        <li><Link to="/makeAdmin"><FontAwesomeIcon icon={faUserPlus} /> Add Admin</Link></li>
                        <li><Link to="/manageService"><FontAwesomeIcon icon={faCogs} /> Manege Services</Link></li>
                        <li><Link to="/customersMail"><FontAwesomeIcon icon={faEnvelope} /> Customers Email</Link></li>
                        
                        </>
                    }
                    
                    <li><Link to="/book"><FontAwesomeIcon icon={faShoppingCart} /> Book</Link></li>
                    <li><Link to="/bookingList"><FontAwesomeIcon icon={faList} /> Booking List</Link></li>
                    <li><Link to="/review"><FontAwesomeIcon icon={faStar} /> Review</Link></li>
                    <li><Link to="/"><FontAwesomeIcon icon={faChevronLeft} /> Back To Home</Link></li>
                </ul>
            </div>
            <div className="logout">
                <button onClick={logoutHandler} className="btn brand-btn">Logout</button>
            </div>
        </section>
    );
};

export default Sidebar;