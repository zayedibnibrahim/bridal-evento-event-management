import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddService = () => {

    const [message, setMessage] = useState('')
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const handleInput = e => {
        const newInfo = { ...info }
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo)
    }
    const handleFileUpload = e => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile)
    }
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', info.title)
        formData.append('details', info.details)
        formData.append('file', file)

        axios.post('http://localhost:4000/addService', formData)
            .then(result => {
                if (result) {
                    setMessage('Service Add SuccessFully')
                    e.target.reset();
                }
            })

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <input onBlur={handleInput} className="form-control" type="text" name="title" placeholder="Title" />
                        </div>

                        <div className="form-group p-2">
                            <textarea onBlur={handleInput} className="form-control" name="details" placeholder="Details" rows="5"></textarea>
                        </div>

                        <div className="form-group p-2">
                            <input onChange={handleFileUpload} className="form-control" type="file" name="UploadFile" />
                        </div>
                        <div className="form-group p-2">
                            <input type="submit" className="btn brand-btn" value="Add Service" />
                        </div>
                    </form>
                    <p style={{ color: 'green' }}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default AddService;