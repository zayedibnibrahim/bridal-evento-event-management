import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { userContext } from '../../../App';
import jwt_decode from "jwt-decode";
import './bookingList.css'
import BookingListCard from './BookingListCard';
const BookingList = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [orders, setOrders] = useState([])
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

    useEffect(() => {

        axios.post(`https://serene-gorge-64668.herokuapp.com/allOrderByPerson/${loggedInUser.email}`)
            .then(result => {
                setOrders(result.data)
            })
    }, [loggedInUser.email])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{ height: '100vh' }}>
                    <h3>Booking list :</h3>
                    <div className="booking-list">
                        {
                            orders.map((order, index) => <BookingListCard index={index} order={order} key={order._id}></BookingListCard>)
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingList;