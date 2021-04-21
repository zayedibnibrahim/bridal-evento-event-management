import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AllOrder = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/allOrder')
            .then(result => {
                setOrders(result.data)
            })
    }, [])

    const handleStatus = (event) => {
        console.log(event.target.value)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 pt-5 pb-5" style={{ height: '100vh' }}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>SL No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) =>
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>{order.name}</td>
                                        <td><a href={`mailto:${order.email}`}>{order.email}</a></td>
                                        <td>{order.serviceId}</td>
                                        <td>{order.personalDetail.address}</td>
                                        <td>
                                            <select value={order.status === 'pending' ? 'pending' : 'done'} onChange={handleStatus}>
                                                <option value="pending">Pending</option>
                                                <option value="done">Done</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllOrder;