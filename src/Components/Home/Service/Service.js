import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import ServiceCard from './ServiceCard';
const Service = () => {
    const [services, setServices] = useState([])
    console.log(services)
    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/services')
            .then(result => {
                setServices(result.data)
            })
    }, [])
    return (
        <section className="container">
            <h1 className="brand-text text-center">Checkout Out Awesome Service</h1>
            <p className="brand-text text-center">ou’ve worked very hard planning for your “Big Day”. You almost want everything to go flawless. There will be so much happening that day. The last thing you should worry about if everything is being documented properly. That’s why we recommend you full day coverage package – one less thing for you to worry about. We will be with you from the very beginning of your day till the end. That means, you just enjoy to the fullest and look fabulous.</p>
            <div className="col-md-8 m-auto">
                {
                    services.map(service => <ServiceCard service={service}></ServiceCard>)
                }
            </div>

        </section>
    );
};

export default Service;