import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import logo from '../../../images/bridal-evento-logo.jpg'
import firebase from "firebase/app";
const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
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
        <section className="sidebar-section ps-5">
            <div className="logo-section">
                <img style={{ borderRadius: '50%' }} src={logo} alt="" width='80'/>
            </div>
            <div className="dashboard-menu pt-5">
                <ul className="list-unstyled">
                    <li><Link>All Order</Link></li>
                    <li><Link to="/addService">Add Service</Link></li>
                    <li><Link>Make Admin</Link></li>
                    <li><Link to="manageService">Manege Services</Link></li>
                    <li><Link to="/book">Book</Link></li>
                    <li><Link>Booking List</Link></li>
                    <li><Link>Review</Link></li>
                </ul>
            </div>
            <div className="logout">
                <button onClick={logoutHandler} className="btn brand-btn">Logout</button>
            </div>
        </section>
    );
};

export default Sidebar;