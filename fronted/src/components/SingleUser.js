import '../App.css';

function SingleUser({ allStudents }) {
    // console.log(allStudents);

    const renderUsers = allStudents.map((user, index) => {
        return (
            <div className="col-3 mb-4 p-2 single-user-parent" key={user._id}>
                <div className="card text-center">
                    <div className="card-header">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{user.email}</h5>
                        <p className="card-text">{user._id}</p>
                        <a href="#" className="btn btn-primary" data-id={user._id}>Delete</a>
                    </div>
                    <div className="card-footer text-muted">
                        {index + 1}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            {renderUsers}
        </>
    )
}

export default SingleUser;