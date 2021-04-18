import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/bridal-evento-logo.jpg'
const Sidebar = () => {
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
                    <li><Link>Manege Services</Link></li>
                    <li><Link>Book</Link></li>
                    <li><Link>Booking List</Link></li>
                    <li><Link>Review</Link></li>
                </ul>
            </div>
        </section>
    );
};

export default Sidebar;