import axios from 'axios';

const UpdateAttendance = async (logoutTime, attendanceId) => {
  try {
    // Your API endpoint for updating attendance
    const apiUrl = `http://localhost:3002/user/updateAttendence/${attendanceId}`;

    // Making a PUT request using Axios
    const response = await axios.put(apiUrl, logoutTime);

    // Handle the response from the server
      return response
  } catch (error) {
    // Handle errors
    console.error('Error updating attendance:', error.message);
  }
};


export default UpdateAttendance

// // Example usage:
// const attendanceId = '65c45ddb787eece8d222c415'; // Replace with the actual attendance ID
// const updatedData = {
//   date: '14-02-2024',
//   loginTime: '11:00 AM',
//   logoutTime: '05:00 PM',
// };

// updateAttendance(attendanceId, updatedData);
