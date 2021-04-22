import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
    const [success, setSuccess] = useState(null)
    const { reset, register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setSuccess('Message Sent Successfully')
        reset();
    }
    return (
        <section className="container pt-5 pb-5" id="contactus">
            <div className="contactUs-info">
                <h1 className="brand-text text-center">Feel Free To Contact Us</h1>
            </div>
            <div className="contactUs-form col-md-5 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="form-control mb-3" type="text" {...register("name", { required: true })} placeholder="Your Name" />
                    {errors.name && <span>This field is required</span>}
                    <input className="form-control mb-3" type="email"{...register("email", { required: true })} placeholder="Your Email" />
                    {errors.email && <span>This field is required</span>}
                    <input className="form-control mb-3" type="tel"{...register("phone", { required: true })} placeholder="Phone Number" />
                    {errors.phone && <span>This field is required</span>}
                    <textarea className="form-control mb-3" {...register("message", { required: true })} placeholder="Message" style={{ width: "93%" }} />
                    {errors.message && <span>This field is required</span>}
                    <br/>
                    <input className="btn brand-btn  mt-2" type="submit" />
                </form>
                {
                    success && <div className="alert alert-success mt-2" role="alert">{success}</div>
                }
            </div>
        </section>
    );
};

export default ContactUs;