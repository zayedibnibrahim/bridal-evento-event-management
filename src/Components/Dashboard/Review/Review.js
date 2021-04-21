import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar/Sidebar';
import jwt_decode from "jwt-decode";
import { userContext } from '../../../App';
import { Rating } from '@material-ui/lab';

const Review = () => {
    const [value, setValue] = useState(5);
    const [serviceId, setServiceId] = useState([])
    const [message, setMessage] = useState(null)
    const [ifOrdered, seIfOrdered] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

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
    const getSessionServeId = sessionStorage.getItem('serveId')
    useEffect(() => {
        if (getSessionServeId) {
            axios.post(`https://serene-gorge-64668.herokuapp.com/services/${getSessionServeId}`)
                .then(result => {
                    if (result.data) {
                        setServiceId(result.data[0])
                    }
                })
        }
    }, [getSessionServeId])

    //check if purchased or not
    useEffect(() => {
        axios.post(`https://serene-gorge-64668.herokuapp.com/allOrderByPerson/${loggedInUser.email}`, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                seIfOrdered(result.data)
            })
    }, [loggedInUser.email])

    //Send Data to review Database
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const reviewData = { ...loggedInUser, serviceName: serviceId.title, review: data.review, rating: value }
        axios.post('https://serene-gorge-64668.herokuapp.com/review', reviewData)
            .then(result => {
                if (result.data) {
                    setMessage('Review Added');
                    reset();
                }
            })
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{ height: '100vh' }}>
                    {
                        ifOrdered.length === 0 ? <div style={{ width: '30%' }} className="alert alert-danger mt-2" role="alert">Sorry You Have Not Purchased  Any Service, or wait to post review <a href="/">Go To Home</a></div> : <div>
                            <h3>Review: <span className="brand-text">{serviceId.length === 0 ? <span>LOADING....</span> : serviceId.title}</span></h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <textarea className="form-control" type="text" {...register("review", { required: true })} placeholder="Write your opinion....." rows="5"></textarea>
                                {
                                    errors.review && <div style={{ width: '30%' }} className="alert alert-danger mt-2" role="alert">Please Write a review</div>
                                }
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                                <br />
                                <input className="btn brand-btn mt-4" type="submit" value="Submit Review" />
                            </form>
                            {
                                message && <div style={{ width: '30%' }} className="alert alert-success mt-2" role="alert">{message}</div>
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Review;