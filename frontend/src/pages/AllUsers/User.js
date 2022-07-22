import React from 'react';

function User({users}) {
    const allUsers = users.map((user, index) => {
        return (
            <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
            </tr>
        )
    })
    return (
        <tbody>{allUsers}</tbody>
    );
}

export default User;