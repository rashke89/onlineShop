import React from 'react';

function SingleUser({allUsers}) {

    const renderUser = allUsers.map((user) => {
        return (
            <div className="col-3 mb-2" key={user._id}>
                <div className="card">
                    <div className="card-header">
                        <h3>{user.firstName ? `${user.firstName} ${user.lastName}` : "Jon Doe"}</h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            <li className="list-group-item">Username: {user.username}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                            <li className="list-group-item">Is admin: {user.isAdmin}</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="row">
            {renderUser}
        </div>
    );
}

export default SingleUser;