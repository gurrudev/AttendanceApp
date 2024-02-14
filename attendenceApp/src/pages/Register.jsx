import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserRegister from '../apis/userRegister';
import toast, { Toaster } from 'react-hot-toast';
import GetUserData from '../apis/getUserData';

const Register = () => {
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({});

    const getUserData = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!newUserData.username) {
            toast.error('Username is required');
            return false;
        }

        if (!newUserData.password) {
            toast.error('Password is required');
            return false;
        }

        if (!newUserData.email) {
            toast.error('Email is required');
            return false;
        } else if (!/^\S+@\S+\.\S+$/.test(newUserData.email)) {
            toast.error('Invalid email format');
            return false;
        }

        if (!newUserData.phoneno) {
            toast.error('Phone number is required');
            return false;
        } else if (!/^\d{10}$/.test(newUserData.phoneno)) {
            toast.error('Invalid phone number');
            return false;
        }

        return true;
    };

    const handleUserRegistration = async () => {
        try {
            if (validateForm()) {
                const registerUser = await UserRegister(newUserData);
                if (registerUser.message) {
                    alert(registerUser.message);
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const userData = async (token) => {
        const data = await GetUserData(token)
        if (data) {
            navigate('/home')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        // console.log(token)
        userData(token);
    }, [])

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container">
                <div className="form">
                    <h2 className='form-heading'>Registration</h2>
                    <div className="inputs">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            onChange={getUserData}
                            name="username"
                            id="username"
                        />
                    </div>

                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            onChange={getUserData}
                            name="password"
                            id="password"
                        />
                    </div>

                    <div className="inputs">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            onChange={getUserData}
                            name="email"
                            id="email"
                        />
                    </div>

                    <div className="inputs">
                        <label htmlFor="phoneno">Phone number</label>
                        <input
                            type="text"
                            className="form-input"
                            onChange={getUserData}
                            name="phoneno"
                            id="phoneno"
                        />
                    </div>

                    <div className="form-btns">
                        <button className="btn-login" onClick={() => navigate('/')}>
                            Login
                        </button>
                        <button className="btn-reg" onClick={handleUserRegistration}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
