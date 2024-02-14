import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLogin from '../apis/userLogin';
import { Toaster, toast } from 'react-hot-toast';
import GetUserData from '../apis/getUserData';

const Login = () => {
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState({});

  const getUserData = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!userLoginData.username) {
      toast.error('Username is required');
      return false;
    }

    if (!userLoginData.password) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  const handleUserLogin = async () => {
    try {
      if (validateForm()) {

        if (userLoginData.username === 'admin' && userLoginData.password === 'admin') {
          navigate('/admin');
        }
        const login = await UserLogin(userLoginData);
        if (login.token) {
          navigate('/home');
        } else if (login.message === 'User not found') {
          toast.error('User not found');
        } else {
          toast.error('Invalid username or password');
        }
      }
    } catch (e) {
      console.error(e);
      toast.error('Login failed. Please try again.');
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
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form">
        <h2 className='form-heading'>Login</h2>
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-input"
            onChange={getUserData}
            name="username"
            id="username"
            required
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
            required
          />
        </div>

        <div className="form-btns">
          <button type="button" className="btn-login" onClick={handleUserLogin}>
            Login
          </button>
          <button className="btn-reg" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
