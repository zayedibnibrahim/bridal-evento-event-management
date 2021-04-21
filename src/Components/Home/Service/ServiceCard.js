import React from 'react';

const ServiceCard = ({ service, getService }) => {
    
    return (
        <div className="row d-flex align-items-center pt-3 pb-3 service-card shadow p-3 mb-5 bg-body rounded">
            <div className="service-img col-md-4">
                <img className="img-fluid" src={`data:image/jpeg;base64,${service.image.img}`} alt="" style={{ width: '300px' }} />
            </div>
            <div className="col-md-8 card-info">
                <h3>{service.title}</h3>
                <p>{service.details}</p>
                <button onClick={() => getService(service._id)} className="btn brand-btn">Book Now</button>
            </div>
        </div>
    );
};

export default ServiceCard;