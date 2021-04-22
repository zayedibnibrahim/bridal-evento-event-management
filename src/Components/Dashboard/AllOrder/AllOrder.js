import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AllOrder = () => {
    const [orders, setOrders] = useState([])
    const [updatedStatus, setUpdatedStatus] = useState(null)


    const getId = (id, upValue) => {
        if(upValue !== null){
            axios.post('https://serene-gorge-64668.herokuapp.com/upStatus', {id, upValue})
            .then(result => {
                if(result.data){
                    loadNew();
                }
            })
        }
        
    }

    const getStatus = (e) => {
        setUpdatedStatus(e.target.value)
    }

    const loadNew = () => {
        axios.get('https://serene-gorge-64668.herokuapp.com/allOrder')
            .then(result => {
                setOrders(result.data)
            })
    }
    useEffect(() => {
        loadNew();
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 pt-5 pb-5" style={{ height: '100vh' }}>
                    <h3>All Order :</h3>
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
                                orders.length === 0 && <CircularProgress color="secondary" />
                            }
                            {
                                orders.map((order, index) =>
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>{order.name}</td>
                                        <td><a href={`mailto:${order.email}`}>{order.email}</a></td>
                                        <td>{order.serviceId}</td>
                                        <td>{order.personalDetail.address}</td>
                                        <td>
                                            <select value={order.status === 'pending' ? 'pending' : 'done'} name="status" onClick={() => getId(order._id, updatedStatus)} onChange={getStatus}>
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