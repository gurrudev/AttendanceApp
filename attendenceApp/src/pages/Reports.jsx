import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUserData from '../apis/getUserData';
import GetAttendanceDataByUser from '../apis/getAttendenceReportByUser';

const Reports = () => {
    const [user, setUserData] = useState(null);
    const [reports, setReportData] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const userData = async (token) => {
        const data = await GetUserData(token);
        setUserData(data?.data?.user._id);
    };

    const reportData = async (_id) => {
        const data = await GetAttendanceDataByUser(_id);
        setReportData(data.data.attendanceData.attendances);
        setLoading(false)
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        userData(token);
    }, []);

    useEffect(() => {
        if (user !== null) {
            reportData(user);
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>

            <div className="container">
                <div>
                    <h1>Attendance Report</h1>

                    {reports.map((item, index) => (
                        <div key={index} className="mt-3">
                            <div className="reports">
                                <strong><span>{item.date}</span></strong>
                                <span>Sign in: {item.loginTime}</span>
                                <span>Sign out: {item.logoutTime}</span>
                            </div>
                        </div>
                    ))}
                    <div className="btn">
                        <button className="btn-report color-green" onClick={() => navigate('/home')}>
                            Back to home
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Reports;
