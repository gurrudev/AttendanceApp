import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GetAttendenceDataByUser from '../apis/getAttendenceReportByUser';

const UserReports = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState()
    const [attendance, setAttendance] = useState([])
    const navigate = useNavigate()

    const reportData = async (_id) => {
        const data = await GetAttendenceDataByUser(_id);
        setUserData(data.data.attendanceData.username);
        setAttendance(data.data.attendanceData.attendances);
    };

    useEffect(() => {
        reportData(id)
    }, [])

    return (
        <div className='container'>
            <div>

                <h2>User Reports of : {userData}</h2>
                {attendance.map((item) => (
                    <div className="reports" key={item._id} >
                        <span className=''>Date: {item.date}</span>
                        <span className=''>Sign In: {item.loginTime}</span>
                        <span className=''>Sign Out: {item.logoutTime}</span>
                    </div>
                ))}

                <div className='btn'>
                    <button className='btn-report' onClick={() => { navigate('/admin') }}>Back to dashboard</button>
                </div>
            </div>

        </div>
    );
};

export default UserReports;
