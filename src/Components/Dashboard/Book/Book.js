import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCard from './SplitCard';
const stripePromise = loadStripe('pk_test_51Ie2WGLQw9RQRbH1yZgSQTodASk88MDsgo3GPwT6eGDGYjs6itMtX79GEg2TbSD9ysD9nHI6lRSZulHlg1wh0pph00dRHwK01g');

const Book = () => {
    const [serviceId, setServiceId] = useState([])
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
    //Load pointed Service
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

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    
    const paymentMethodSuccess = paymentId => {
        console.log(paymentId)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" type="text" defaultValue={loggedInUser.name} {...register("name", { required: true })} itemID="name" />
                        {errors.name && <span>This field is required</span>}
                        <br />
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input className="form-control" type="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} itemID="email" />
                        {errors.email && <span>This field is required</span>}
                        <br />
                        <label htmlFor="service" className="form-label">Service Name</label>
                        <input disabled defaultValue={serviceId.title} className="form-control" type="text" {...register("service", { required: true })} itemID="service" />
                        {errors.service && <span>This field is required</span>}
                        <br />
                        <input className="btn brand-btn" type="submit" />
                    </form>
                    <div>
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