import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserView() {
    const { email } = useParams(); // Use email from URL params
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (email) {
            getUser();
        }
    }, [email]);

    const getUser = async () => {
        try {
            console.log('Fetching user with email:', email);
            const response = await axios.get(`http://localhost:4000/user/${email}`);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error.response ? error.response.data : error.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div>UserView - {email}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
                    ) : (
                        user ? (
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Profile Picture</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Profile Picture</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.address}</td>
                                            <td>{user.profilePicture ? <img src={user.profilePicture} alt="Profile" width="100" /> : 'No Picture'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>User not found</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default UserView;
