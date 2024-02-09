import axios from "axios";

const AddNewAttendence = async (params) => {
    const attendanceUrl = "http://localhost:3002/user/addAttendance";

    try {
        const response = await axios.post(attendanceUrl, params);

        return response.data;
    } catch (error) {

        console.error(error.response.data);
        return null;
    }
};

export default AddNewAttendence
