import React from 'react';

const BookingListCard = ({order, index}) => {
    return (
        <div className="single-book-list row shadow rounded d-flex align-items-center">
            <div className="col-md-2 count-book">
                <h2 className="text-white">{index +1}.</h2>
            </div>
            <div className="col-md-10 book-info">
                <h6 className="text-white">Service Name: <br/>{order.serviceId}</h6>
            </div>
        </div>
    );
};

export default BookingListCard;