import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCard from './SplitCard';
import { useHistory } from 'react-router';
import DateAndTimePicker from './DateAndTimePicker';
const stripePromise = loadStripe('pk_test_51Ie2WGLQw9RQRbH1yZgSQTodASk88MDsgo3GPwT6eGDGYjs6itMtX79GEg2TbSD9ysD9nHI6lRSZulHlg1wh0pph00dRHwK01g');

const Book = () => {
    const [eventDate, setEventDate] = useState([])
    const [eventTime, setEventTime] = useState([])
    const [serviceId, setServiceId] = useState([])
    const [shipmentData, setShipmentData] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
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

    //Load pointed Service at top
    useEffect(() => {
        const getSessionServeId = sessionStorage.getItem('serveId')
        if (getSessionServeId) {
            axios.post(`https://serene-gorge-64668.herokuapp.com/services/${getSessionServeId}`)
                .then(result => {
                    if (result.data) {
                        setServiceId(result.data[0])
                    }
                })
        }
    }, [])

    //Handle Information Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setShipmentData(data)
    };

    //Date and Time Picker
    const [selectedDate, setSelectedDate] = useState({
        date: new Date(),
        time: new Date()
    });
    const handleEventDate = (date) => {
        const newDates = { ...selectedDate }
        newDates.date = date;
        setSelectedDate(newDates);
        setEventDate(newDates.date.toDateString())
    };
    const handleEventTime = (time) => {
        const newDates = { ...selectedDate }
        newDates.time = time;
        setSelectedDate(newDates);
        setEventTime(newDates.time.toTimeString())
    };

    //send Order data to Database
    const paymentMethodSuccess = paymentId => {
        const orderData = { ...loggedInUser, serviceId: serviceId.title, personalDetail: shipmentData, date: eventDate, time: eventTime, paymentId, status: "pending" }
        axios.post('https://serene-gorge-64668.herokuapp.com/paymentDone', orderData)
            .then(result => {
                if (result.data) {
                    history.push('/thankYou')
                }
            })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5">
                    <h3>Selected Service: <span className="brand-text">{serviceId.length === 0 ? <span>LOADING....</span> : serviceId.title}</span></h3>
                    <form onBlur={handleSubmit(onSubmit)}>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" type="text" defaultValue={loggedInUser.name} {...register("name", { required: true })} itemID="name" />
                        {errors.name && <span>This field is required</span>}
                        <br />
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input className="form-control" type="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} itemID="email" />
                        {errors.email && <span>This field is required</span>}
                        <br />
                        <label htmlFor="address" className="form-label">Address</label>
                        <input className="form-control" type="text" {...register("address", { required: true })} itemID="address" />
                        {errors.address && <span>This field is required</span>}
                    </form>
                    <DateAndTimePicker handleEventDate={handleEventDate} handleEventTime={handleEventTime} selectedDate={selectedDate}></DateAndTimePicker>
                    <div className="pt-5">
                        <p style={{fontWeight: '700'}} className="brand-text">Your Service Charge Will Be: ৳ {serviceId.length === 0 ? <span>LOADING....</span> : serviceId.price}</p>
                        <Elements stripe={stripePromise}>
                            <SplitCard paymentMethodSuccess={paymentMethodSuccess}></SplitCard>
                        </Elements>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Book;