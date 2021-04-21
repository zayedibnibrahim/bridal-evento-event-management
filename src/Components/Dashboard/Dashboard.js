import React from 'react';
import AllOrder from './AllOrder/AllOrder';
import Sidebar from './Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10">
                    <h1>This Is DashBoard</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;