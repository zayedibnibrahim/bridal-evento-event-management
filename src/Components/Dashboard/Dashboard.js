import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Sidebar from './Sidebar/Sidebar';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [orders, setOrders] = useState([])
    const [services, setServices] = useState([])

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
    //get service count

    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/services')
            .then(result => {
                setServices(result.data)
            })
    }, [])

    //All orders

    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/allOrder')
            .then(result => {
                setOrders(result.data)
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{ height: '100vh' }}>
                    <div className="dashInfo">
                        <h1 className="brand-text">Admin Dashboard</h1>
                        <h3>Welcome {loggedInUser.name},</h3>
                    </div>
                    <div className="summery rounded shadow p-2" style={{ backgroundColor: "#f1f2f6" }}>
                        <div className="row rounded shadow p-4" style={{ backgroundColor: "#ff7f50" }}>
                            <div className="heading col-md-10">
                                <h4 className="text-white">Total Available Service: </h4>
                            </div>
                            <div className="count-number col-md-2">
                                <h4 className="text-white">{services.length}</h4>
                            </div>
                        </div>
                        <div className="row rounded shadow p-4" style={{ backgroundColor: "#ff7f50" }}>
                            <div className="heading col-md-10">
                                <h4 className="text-white">Total order: </h4>
                            </div>
                            <div className="count-number col-md-2">
                                <h4 className="text-white">{orders.length}</h4>
                            </div>
                        </div>
                        <div className="row rounded shadow p-4" style={{ backgroundColor: "#d63031" }}>
                            <div className="heading col-md-10">
                                <h4 className="text-white">Total Pending: </h4>
                            </div>
                            <div className="count-number col-md-2">
                                <h4 className="text-white">{orders.filter(order => order.status === 'pending').length}</h4>
                            </div>
                        </div>
                        <div className="row rounded shadow p-4" style={{ backgroundColor: "#44bd32" }}>
                            <div className="heading col-md-10">
                                <h4 className="text-white">Total Completed: </h4>
                            </div>
                            <div className="count-number col-md-2">
                                <h4 className="text-white">{orders.filter(order => order.status === 'done').length}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;