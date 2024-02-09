import axios from 'axios'

const GetAttendenceDataByUser = async(userId) =>{
    try {
        const response = await axios.get(`http://localhost:3002/user/userAttendenceData/${userId}`)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export default GetAttendenceDataByUser