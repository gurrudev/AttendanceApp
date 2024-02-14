import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GetAttendenceDataByUser from '../apis/getAttendenceReportByUser';

const UserReports = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState()
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const reportData = async (_id) => {
        const data = await GetAttendenceDataByUser(_id);
        setUserData(data.data.attendanceData.username);
        setAttendance(data.data.attendanceData.attendances);
        setLoading(false)
    };

    useEffect(() => {
        reportData(id)
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container'>
            <div>

                <h2>Reports of : {userData}</h2>
                {attendance.map((item) => (
                    <div className="reports mt-3" key={item._id} >
                       <strong> <span className=''>{item.date}</span></strong>
                        <span className=''>Sign In: {item.loginTime}</span>
                        <span className=''>Sign Out: {item.logoutTime}</span>
                    </div>
                ))}

                <div className='btn'>
                    <button className='btn-report color-green' onClick={() => { navigate('/admin') }}>Back to dashboard</button>
                </div>
            </div>

        </div>
    );
};

export default UserReports;
