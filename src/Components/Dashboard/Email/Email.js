import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Email = () => {
    const [inbox, setInbox] = useState([])

    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/showEmail')
        .then(result => {
            setInbox(result.data)
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5" style={{ height: '100vh' }}>
                    <h3>Customers Mail :</h3>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>SL No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inbox.length === 0 && <CircularProgress color="secondary" />
                            }
                            {inbox.map((mail, index) => <tr key={mail.name}>
                                <td>{index + 1}</td>
                                <td>{mail.name}</td>
                                <td>{mail.email}</td>
                                <td><p>{mail.message}</p></td>
                            </tr>)}

                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    );
};

export default Email;