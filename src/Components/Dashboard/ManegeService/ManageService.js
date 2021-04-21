import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const ManageService = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        loadData();
    }, [])
    const loadData = () => {
        axios.get('http://localhost:4000/services')
            .then(result => {
                setServices(result.data)
            })
    }
    const deleteHandler = serviceId => {
        axios.delete(`http://localhost:4000/deleteService/${serviceId}`)
        .then(result => {
            if(result.data){
                loadData();
            }
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{height: '100vh'}}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>SL No</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Charge</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {services.map((service, index) => <tr key={service.title}>
                                <td>{index + 1}</td>
                                <td><img className="rounded float-center" src={`data:image/jpeg;base64,${service.image.img}`} alt="" style={{ width: '50px' }} /></td>
                                <td>{service.title}</td>
                                <td>৳ {service.price}</td>
                                <td>
                                    <button onClick={() => deleteHandler(service._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageService;