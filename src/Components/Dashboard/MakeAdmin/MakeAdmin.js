import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar/Sidebar';

const MakeAdmin = () => {
    const [success, setSuccess] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post('https://serene-gorge-64668.herokuapp.com/addAdmin', data)
        .then(result => {
            if(result.data){
                setSuccess('Admin Added Successfully')
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{ height: '100vh' }}>
                    <h3>Add An Admin</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input className="form-control" type="email" {...register("email", { required: true })} itemID="email" />
                        {
                            errors.email && <div style={{ width: '30%' }} className="alert alert-danger mt-2" role="alert">
                                This field is required
                                            </div>
                        }
                        {
                            success && <div style={{ width: '30%' }} className="alert alert-success mt-2" role="alert">
                            {success}
                                        </div>
                        }
                        <input className="btn brand-btn mt-2" type="submit" value="Add Admin" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;