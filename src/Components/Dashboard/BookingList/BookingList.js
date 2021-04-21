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

        axios.get(`https://serene-gorge-64668.herokuapp.com/allOrderByPerson/${loggedInUser.email}`, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
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
                    {
                        orders.length === 0 ? <div style={{ width: '30%' }} className="alert alert-danger mt-2" role="alert">Sorry You Have Not Purchased  Any Service Yet, <a href="/">Go To Home</a> or Wait for few Second to See Order History </div> : <div className="booking-list">
                            {
                                orders.map((order, index) => <BookingListCard index={index} order={order} key={order._id}></BookingListCard>)
                            }
                        </div>
                    }


                </div>
            </div>
        </div>
    );
};

export default BookingList;