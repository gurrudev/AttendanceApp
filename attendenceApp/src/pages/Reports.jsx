import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUserData from '../apis/getUserData';
import GetAttendanceDataByUser from '../apis/getAttendenceReportByUser';

const Reports = () => {
    const [user, setUserData] = useState(null);
    const [reports, setReportData] = useState([]); // Initialize as an array

    const navigate = useNavigate();

    const userData = async (token) => {
        const data = await GetUserData(token);
        setUserData(data?.data?.user._id);
    };

    const reportData = async (_id) => {
        const data = await GetAttendanceDataByUser(_id);
        setReportData(data.data.attendanceData.attendances);
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

    return (
        <div className="container">
            <div>
                <h1>Attendance Reports</h1>
                {reports.map((item, index) => (
                    <div key={index} className="reports">
                        <span>{item.date}</span>
                        <span>Sign in: {item.loginTime}</span>
                        <span>Sign out: {item.logoutTime}</span>
                    </div>
                ))}
                <div className="btn">
                    <button className="btn-report" onClick={() => navigate('/home')}>
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
