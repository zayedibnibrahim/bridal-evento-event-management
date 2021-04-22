import React from 'react';

const BookingListCard = ({order, index}) => {
    return (
        <div className="single-book-list row shadow rounded d-flex align-items-center p-2">
            <div className="col-md-2 count-book">
                <h2 className="text-white">{index +1}.</h2>
            </div>
            <div className="col-md-10 book-info">
                <h6 className="text-white">Service Name: {order.serviceId}</h6>
                {
                    order.status === 'pending' ? <span style={{backgroundColor: '#d63031', padding: '5px'}} className="text-white rounded">Status: {order.status}</span> : <span style={{backgroundColor: '#44bd32', padding: '5px'}} className="text-white rounded">Status: {order.status}</span>
                }
                
            </div>
        </div>
    );
};

export default BookingListCard;