import React from 'react';

const AllOrder = () => {
    return (
        <div>
            <div className="admin-header">
                <div className="row">
                    <div className="col-md-6">
                        <h3>All Recent Order</h3>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
            <div className="table-of-order">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th>Pay With</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrder;