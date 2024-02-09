import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetAllUsers from '../apis/getAllUsers';

const Admin = () => {
    const navigate = useNavigate();
    const [allUserData, setAllUserData] = useState([]);

    const getAllUserData = async () => {
        try {
            const response = await GetAllUsers();
            setAllUserData(response.data.users || []);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        getAllUserData();
    }, []);

    const redirectToUserReports = (userId) => {
        navigate(`/userReports/${userId}`);
    };

    return (
        <div className="container">
            <div>
                <h1>Admin Dashboard</h1>
                {allUserData.map((user) => (
                    <div className="reports" key={user._id} >
                        <div className="user-info pointer" onClick={() => redirectToUserReports(user._id)}>
                            <span className=''>{user.username}</span>
                        </div>
                    </div>
                ))}

                <div className='btn'>
                    <button className='btn-report' onClick={() => { navigate('/') }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
