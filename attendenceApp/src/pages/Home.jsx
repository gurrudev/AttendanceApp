import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetUserData from '../apis/getUserData';
import FormatTime from '../utils/formattedTime';
import FormatDate from '../utils/formattedDate';
import AddNewAttendance from '../apis/userSignin';
import UpdateAttendance from '../apis/userSignout';
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState();
    const [dateToday, setDateToday] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [isSignin, setIsSignin] = useState(false);
    const [attendenceId, setAttendenceId] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [disableSignOut, setDisableSignOut] = useState(
      localStorage.getItem('disableSignOut') === 'true'
    );

    const [justSignedOut, setJustSignedOut] = useState(false);
  
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetUserData(token);
          setUsername(data.data.user.username);
          setUserLoggedIn(data.data.user);
  
          const storedAttendenceId = localStorage.getItem('attendenceId');
          const hasAttendenceId = !!storedAttendenceId;
          setIsSignin(hasAttendenceId);
  
          if (hasAttendenceId) {
            setAttendenceId(storedAttendenceId);
          }
  
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [token, justSignedOut]);
  
    const addAttendance = async () => {
      try {
        const data = {
          date: dateToday,
          loginTime: currentTime,
          user: userLoggedIn._id,
          username: userLoggedIn.username
        };
  
        const res = await AddNewAttendance(data);
        console.log('Add Attendance Response:', res);
  
        if (res.attendence_data) {
          setAttendenceId(res.attendence_data._id);
          setIsSignin(true);
          setJustSignedOut(false);
          localStorage.setItem('isSignin', 'true');
          localStorage.setItem('attendenceId', res.attendence_data._id);
          toast.success('Sign in success');
        } else {
          setIsSignin(false);
          setJustSignedOut(false);
          localStorage.setItem('isSignin', 'false');
          localStorage.removeItem('attendenceId');
  
          alert('Something Went Wrong');
          toast.error('Sign in failed');
        }
      } catch (error) {
        console.error('Error adding attendance:', error);
        alert('Something Went Wrong');
      }
    };
  
    const updateAttendance = async () => {
      try {
        const data = {
          logoutTime: currentTime,
        };
  
        setButtonClicked(true);
  
        const res = await UpdateAttendance(data, attendenceId);
  
        setIsSignin(false);
        setJustSignedOut(true);
        setDisableSignOut(true);
        localStorage.setItem('disableSignOut', 'true');
        toast.success('Sign out success');
  
        const cleanup = () => {
          localStorage.setItem('isSignin', 'false');
          localStorage.removeItem('attendenceId');
          setButtonClicked(false);
        };
  
        setTimeout(() => {
          cleanup();
        }, 0);
      } catch (error) {
        console.error('Error updating attendance:', error);
        toast.error('Something Went Wrong');
      }
    };
  
    useEffect(() => {
      const date = new Date();
      setDateToday(FormatDate(date));
      setCurrentTime(FormatTime(date));
    }, []);
  
    // useEffect(() => {
    //   if (userLoggedIn === undefined || userLoggedIn.message === 'Invalid token') {
    //     navigate('/');
    //   }
    // }, [userLoggedIn, navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isSignin');
      setJustSignedOut(true);
      setDisableSignOut(false);
      localStorage.removeItem('disableSignOut'); // Remove disableSignOut on logout
      navigate('/');
    };
  
    const renderSignInOutButton = () => {
      if (isSignin === false) {
        return (
          <button
            className='btn-action '
            onClick={addAttendance}
      
          >
            Sign In
          </button>
        );
      } else {
        return (
          <button
            className='btn-action'
            onClick={updateAttendance}
           
          >
            Sign Out
          </button>
        );
      }
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className='container'>
          <div className='home-1'>
            <span>Welcome {username}</span>
            <div className='date-and-time'>
              <div className='date'>{dateToday}</div>
              <div className='time'>{currentTime}</div>
            </div>
  
            <div className='btn'>{renderSignInOutButton()}</div>
  
            <div className='btn'>
              <button className='btn-report color-green' onClick={() => { navigate('/reports') }}>View Report</button>
            </div>
  
            <div className='btn'>
              <button className='btn-report color-red' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;
  
  